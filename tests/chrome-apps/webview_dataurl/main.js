var LOG = function(msg) {
  window.console.log(msg);
};

var setWebview = function(src) {
  var w = document.querySelector('webview');
  w.setAttribute('src', src);
};

var chooseFile = function() {
  chrome.fileSystem.chooseEntry({
    'type': 'openFile',
  }, function(entry, fileEntries) {
    if (!entry) {
      return;
    }
    var fileEntry = entry;
    fileEntry.file(function(file) {
      var fileReader = new FileReader();
      fileReader.onloadend = function() {
        var dataURI = fileReader.result;
        LOG('dataURI: ' + dataURI);
        setWebview(dataURI);
      };
      fileReader.readAsDataURL(file);
    });
  });
};

window.onload = function() {
  // file open.
  document.getElementById('choose-file').onclick = chooseFile;
};
