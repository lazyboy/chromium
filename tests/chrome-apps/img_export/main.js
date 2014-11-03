// Writes |outFileName| after the directory is chosen.
var $ = function(id) { return document.getElementById(id); };
var log = function(msg) { window.console.log(msg); };

var outFileName = 'output2.png';

var writeFile = function(dirEntry, outFileName, blobContent) {
  var onWriteEnd = function(e) { log('onWriteEnd'); };
  var onWriteError = function(e) { log('onWriteError'); };
  dirEntry.getFile(outFileName, {create: true}, function(fileEntry) {
    log('callback dirEntry.getFile');
    fileEntry.createWriter(function(fileWriter) {
      log('callback fileEntry.createWriter');
      fileWriter.onwriteend = onWriteEnd;
      fileWriter.onerror = onWriteError;
      fileWriter.write(blobContent);
      log('last line executed');
    });
  });
};

// Writes file upon receiving png file's data from background page.
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  log('app got request: ' + req.type);
  if (req.type == 'request-file-response') {
    var len = req.data.length;
    log('length read: ' + len);
    var arrayBuffer = new Uint8Array(req.data).buffer;
    var blob = new Blob([arrayBuffer], {type: 'image/png'});

    chrome.fileSystem.chooseEntry({
      type: 'openDirectory',
      accepts: [{description: 'open dir to export to'}]
    }, function(dirEntry, fileEntries) {
      log('callback fileSystem.chooseEntry');
      if (chrome.runtime.lastError) {
        log('failed chrome.runtime.lastError');
        log(chrome.runtime.lastError.message);
        return;
      }
      
      chrome.fileSystem.getWritableEntry(dirEntry, function(writableDirEntry) {
        log('callback fileSystem.getWritableEntry');
        if (chrome.runtime.lastError) {
          log('failed chrome.runtime.lastError');
          return;
        }

        writeFile(writableDirEntry, outFileName, blob);
      });
    });
  }
});

window.onload = function() {
  $('copy-button').addEventListener('click', function(e) {
    log('copy-button click');

    // Send request to background page to read png file.
    // The response is sent back with request.type = 'request-file-system'.
    chrome.runtime.sendMessage({
      type: 'request-file'
    }, function(response) {
      // TODO: This doesn't work.
      log('runtime.sendMessage response');
      log('runtime.sendMessage response');
      log('runtime.sendMessage response');
    });
  });
};

