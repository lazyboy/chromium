var LOG = function(msg) {
  window.console.log(msg);
};

var startTest = function() {
  LOG('startTest');
  var w = document.querySelector('webview');
  if (!w) {
    LOG('<webview> not found');
    return;
  }
  w.addEventListener('exit', function(e) {
    LOG('exit called');
  });
  w.terminate();
  w.terminate();
  w.terminate();
  w.terminate();
};

onload = function() {
  document.getElementById('terminate-button').onclick = function(e) {
    startTest();
  };
};
