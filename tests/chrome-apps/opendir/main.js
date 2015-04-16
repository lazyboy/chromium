var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

// ---- FileInfo ----
var FileInfo = function(path, size) {
  this.path_ = path;
  this.size_ = size;
};

FileInfo.prototype.getSize = function() { return this.size_; };
FileInfo.prototype.getPath = function() { return this.path_; };

// ---- DirReader ----
var DirReader = function() {
  this.qh_ = 0;
  this.qt_ = 0;
  this.q_ = [];

  this.fileEntries_ = [];

  // including number of pending queries for file items.
  this.numTotal_ = 0;
};

DirReader.prototype.read = function(dirEntry, opt_resultsCallback) {
  if (!!opt_resultsCallback) {
    this.resultsCallback_ = opt_resultsCallback;
  }

  var reader = dirEntry.createReader();
  var self = this;
  reader.readEntries(function(entries) {
    for (var i = 0; i < entries.length; ++i) {
      var entry = entries[i];

      if (entry.isFile) {
        self.numTotal_++;
        self.onGotFile_(entry);
      }
      if (entry.isDirectory) {
        self.q_[self.qt_++] = entry;
      }
    }
    self.checkAndFinish_();
  });
};

DirReader.prototype.onGotFile_ = function(entry) {
  var selfOuter = this;
  chrome.fileSystem.getDisplayPath(entry, function(text) {
    // path.
    var t = text;
    var self = selfOuter;
    entry.file(function(f) {
      // f.size.
      var info = new FileInfo(t, f.size);
      var idx = self.fileEntries_.length;
      self.fileEntries_.push(info);
      //window.console.log('FileInfo [' + idx + ']: ' + t + ', ' + f.size);
      self.checkAndFinish_();
    });
  });
};

DirReader.prototype.checkAndFinish_ = function() {
  //LOG('DirReader.checkAndFinish_, h = ' + this.qh_ + ', t = ' + this.qt_);

  if (this.qh_ >= this.qt_ && this.fileEntries_.length >= this.numTotal_) {
    if (!this.called_) {
      this.called_ = true;
      this.resultsCallback_(this.fileEntries_);
      return;
    }
  }

  while(this.qh_ < this.qt_) {
    var curQ = this.q_[this.qh_];
    this.q_[this.qh_] = null;
    ++this.qh_;
    this.read(curQ);
  }
};

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

var openDirRecurseHandler = function(e) {
  LOG('openDirRecurseHandler');
  chrome.fileSystem.chooseEntry({
    'type': 'openDirectory'
  }, function(entry, fileEntries) {
    LOG('openDirRecurseHandler.callback');
    //startRecurse(entry);
    var r = new DirReader();
    r.read(entry, function(entries) {
      LOG('read callback called, items: ' + entries.length);
      for (var i = 0; i < entries.length; ++i) {
        LOG('finfo: ' + entries[i].getPath() +
            ', num bytes: ' + entries[i].getSize());
      }
    });
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
