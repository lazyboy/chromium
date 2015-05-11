var LOG = function(msg) {
  window.console.log(msg);
};

var startTest = function() {
  LOG('startTest');
  var w = document.querySelectorAll('webview');
  if (!w) {
    LOG('<webview> not found');
    return;
  }

  for (i = 0; i < w.length; ++i) {
    var ww = w[i];
    ww.addEventListener('exit', function(e) {
      LOG('exit called');
    });
    ww.terminate();
    ww.terminate();
    ww.terminate();
    ww.terminate();
  }

};

onload = function() {
  document.getElementById('terminate-button').onclick = function(e) {
    startTest();
  };
};
