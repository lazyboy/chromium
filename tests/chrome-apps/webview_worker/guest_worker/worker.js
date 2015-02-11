self.requestFileSystemSync = self.webkitRequestFileSystemSync ||
                             self.requestFileSystemSync;

var sendMessage = function(d) {
  self.postMessage(JSON.stringify(d));
};

var requestFS = function() {
  try {
    sendMessage({'a': 'request-fs'});
    var filesystem = requestFileSystemSync(PERSISTENT, 1024 * 4); // 4kb
    var result = !!filesystem;
    sendMessage({'a': 'result1', 'b': result});
    if (result) {
      var fe = filesystem.root.getFile('abacus.txt', {create: true});
      sendMessage({'a': 'dbg', 'fe': fe.toString()});
      var errorHandler = function() {
        sendMessage({'a': 'dbg', 'b': 'createWriter error'});
      };
      window.setInterval(function() {
        fe.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function() {
            sendMessage({'a': 'dbg', 'b': 'onwriteend'});
          };
          fileWriter.onerror = function(e) {
            sendMessage({'a': 'dbg', 'b': 'onerror: ' + e.toString()});
          };
          var b = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
          fileWriter.write(b);
        }, errorHandler);
      }, 2000);
    }
  } catch (e) {
    sendMessage({'dbg': 'result-fs catch: ' + e.toString()});
  }
};

self.addEventListener('message', function(e) {
  var data = JSON.parse(e.data);
  if (data.a == 'request-fs') {
    requestFS();
  }       
});      
