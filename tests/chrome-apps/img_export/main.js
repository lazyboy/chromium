// Writes |request.outputFileName| after the directory is chosen.
var $ = function(id) { return document.getElementById(id); };
var log = function(msg) { window.console.log(msg); };

var outFileName = 'output2.png';

var writeFile = function(dirEntry, outFileName, blobContent) {
  var onWriteEnd = function(e) {
    log('Success writeend');
  };
  var onWriteError = function(e) { log('onWriteError'); };
  var onWriteTruncated = function(fileEntry) {
    log('onWriteTruncated');
    dirEntry.getFile(outFileName, {create: true}, function(fileEntry) {
      log('callback [2] dirEntry.getFile');
      fileEntry.createWriter(function(fileWriter) {
        log('callback [2] fileEntry.createWriter');
        fileWriter.onwriteend = onWriteEnd;
        fileWriter.onerror = onWriteError;
        fileWriter.write(blobContent);
      });
    });
  };
  dirEntry.getFile(outFileName, {create: true}, function(fileEntry) {
    log('callback dirEntry.getFile');
    fileEntry.createWriter(function(fileWriter) {
      log('callback fileEntry.createWriter');
      fileWriter.onwriteend = onWriteTruncated.bind(fileEntry);
      fileWriter.onerror = onWriteError;
      fileWriter.truncate(0);
    });
  });
};

// Writes file upon receiving png file's data from background page.
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  log('app got request: ' + req.type);
  if (req.type == 'request-file-response') {
    var len = req.data.length;
    var contentType = req.contentType;
    var outputFileName = req.outputFileName;
    log('length read: ' + len);
    log('contentType: ' + contentType);
    log('outputFileName: ' + outputFileName);
    //debugger;
    var arrayBuffer = new Uint8Array(req.data).buffer;
    var blob = new Blob([arrayBuffer], {type: contentType});

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

        writeFile(writableDirEntry, outputFileName, blob);
      });
    });
  }
});

window.onload = function() {
  $('copy-image-button').addEventListener('click', function(e) {
    log('copy-image-button click');

    // Send request to background page to read png file.
    // The response is sent back with request.type = 'request-file-system'.
    chrome.runtime.sendMessage({
      type: 'request-file',
      fileName: 'input.png'
    }, function(response) {
      // TODO: This doesn't work.
      log('runtime.sendMessage response');
      log('runtime.sendMessage response');
      log('runtime.sendMessage response');
    });
  });
  $('copy-text-button').addEventListener('click', function(e) {
    log('copy-text-button click');
    chrome.runtime.sendMessage({type: 'request-file', fileName: 'input.txt'});
  });
};

