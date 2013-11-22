var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

var FileInfo = function(path, size) {
  this.path_ = path;
  this.size_ = size;
};

FileInfo.prototype.getSize = function() { return this.size_; };
FileInfo.prototype.getPath = function() { return this.path_; };

var showFileInfo = function(idx, entry) {
  chrome.fileSystem.getDisplayPath(entry, function(text) {
    // path.
    var t = text;
    entry.file(function(f) {
      // f.size.
      window.console.log('FileInfo [' + idx + ']: ' + t + ', ' + f.size);
    });
  });
};

var outputProps = function(o, opt_name) {
  LOG('BEG');
  var name = opt_name || 'unknown';
  for (var props in o) {
    window.console.log(props + ': ' + o[props]);
  }
  LOG('END');
};

var q = [];
var qh = 0;
var qt = 0;
var numFilesSeen = 0;

var pickSomeStuffToDo = function() {
  while(qh < qt) {
    LOG('begin dir read: ' + q[qh].name);
    LOG('qh = ' + qh + ', qt = ' + qt);
    readDirStuff(q[qh++]);
  }
};

var readDirStuff = function(dirEntry) {
  var reader = dirEntry.createReader();
  reader.readEntries(function(entries) {
    LOG('reader.readEntries, entries: ' + entries);
    for (var i = 0; i < entries.length; ++i) {
      var entry = entries[i];

      if (entry.isFile) {
        showFileInfo(numFilesSeen, entry);
        ++numFilesSeen;
      }
      if (entry.isDirectory) {
        LOG('q.push: ' + entry);
        q[qt++] = entry;
      }
    }
    pickSomeStuffToDo();
  });
};

var startRecurse = function(dirEntry) {
  q[qt++] = dirEntry;
  pickSomeStuffToDo();
};

var openDirRecurseHandler = function(e) {
  LOG('openDirRecurseHandler');
  chrome.fileSystem.chooseEntry({
    'type': 'openDirectory'
  }, function(entry, fileEntries) {
    LOG('openDirRecurseHandler.callback');
    startRecurse(entry);
  });
};

var openDirHandler = function(e) {
  LOG('openDirHandler');
  var first = true;

  chrome.fileSystem.chooseEntry({
    'type': 'openDirectory'
  }, function(entry, fileEntries) {
    LOG('callback');

    /*
    LOG('entry: ' + entry);
    for (var key in entry) {
      LOG('key: ' + key + ', val: ' + entry[key]);
    }
    */

    var dirEntry = entry;
    var reader = dirEntry.createReader();
    reader.readEntries(function(entries) {
      LOG('reader.readEntries, entries: ' + entries);
      var j = 0;
      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];
        //if (entry.isDirectory) { LOG('dir: ' + entry.fullPath); }
        //else if (entry.isFile) { LOG('file: ' + entry.fullPath); }
        //else { LOG('unkw: ' + entry.fullPath); }

        if (entry.isFile) {
          showFileInfo(j, entry);
          ++j;
        }
        if (first && entry.isDirectory) {
          first = false;
          LOG('entry: ' + entry);
          for (var key in entry) {
            LOG('key: ' + key + ', val: ' + entry[key]);
          }
        }
      }
    });
  });
};

window.onload = function() {
  $('open-dir').onclick = openDirHandler;
  $('open-dir-recurse').onclick = openDirRecurseHandler;
};
