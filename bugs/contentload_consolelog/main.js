var tryWebview = function() {
  var oldWebview = document.querySelector('webview');
  if (oldWebview) {
    oldWebview.parentNode.removeChild(oldWebview);
  }

  var w = document.createElement('webview');
  w.addEventListener('consolemessage', function(e) {
    window.console.log('guest says: ' + e.message);
  });
  var startString = 'window.console.log("test from webview");';
  w.addEventListener('contentload', function(e) {
    window.console.log('contentload');
    w.executeScript({code: startString});
  });
  document.body.appendChild(w);
  w.src = 'http://www.ghisler.com';
};
window.onload = function() {
  document.querySelector('#go').onclick = tryWebview;
};
