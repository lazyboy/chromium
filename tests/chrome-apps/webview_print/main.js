var LOG = function(msg) {
  window.console.log(msg);
};

var addWebview = function(src) {
  LOG('addWebview');
  var w = document.createElement('webview');
  w.setAttribute('src', src);

  w.addEventListener('loadstop', function(e) {
    LOG('loadstop');
    w.executeScript({file: 'guest.js'}, function(results) { LOG('exec'); });
  });

  document.body.appendChild(w);
};

window.onload = function() {
  addWebview('about:blank');

  document.querySelector('button').onclick = function(e) {
    LOG('embedder.button.onclick');
    window.print();
  };
};
