var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

var addWebview = function(src) {
  var w = document.createElement('webview');

  w.addEventListener('loadstop', function(e) {
    LOG('loadstop');
    w.executeScript(
        {file: 'guest.js'},
        function(results) {
          LOG('executeScript.results');
          LOG('executeScript.results.length: ' + results.length);
        });
  });
  w.addEventListener('consolemessage', function(e) {
    LOG('[Guest (if you see this, then executeScript worked!)]: ' + e.message);
  });

  w.setAttribute('src', src);
  document.body.appendChild(w);
};

window.onload = function() {
  addWebview('about:blank');
};
