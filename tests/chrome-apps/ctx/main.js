var LOG = function(msg) {
  window.console.log(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
return "data:text/html,<body bgcolor=red>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var getWebViewSrc2 = function() {
return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

window.onload = function() {
  var src = getWebViewSrc();

  var w = document.createElement('webview');
  w.id = 'webview1';

  w.addEventListener('loadstop', function(e) {
    LOG('webview1.loadstop');
    LOG('BEG contextMenus.create');
    var menuItem = w.contextMenus.create({'title': 'bar'},
        function() {LOG('hi'); });
    LOG('END contextMenus.create');
  });

  w.src = src;
  document.body.appendChild(w);

  var w2 = document.createElement('webview');
  w2.id = 'webview2';
  w2.src = getWebViewSrc2();
  document.body.appendChild(w2);
};
