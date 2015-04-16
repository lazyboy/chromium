var LOG = function(msg) {
  window.console.log(msg);
};

var getEventListener = function(i) {
  return function(e) {
    LOG('EventListener: ' + i + ', reason: ' + e.reason);
  };
};

var startTest = function() {
  LOG('startTest');
  var w = document.querySelectorAll('webview');
  if (!w) {
    LOG('<webview> not found');
    return;
  }

  for (var i = 0; i < w.length; ++i) {
    var ww = w[i];
    ww.addEventListener('exit', getEventListener(i));
    ww.terminate();
  }
};

onload = function() {
  document.getElementById('terminate-button').onclick = function(e) {
    startTest();
  };
};
