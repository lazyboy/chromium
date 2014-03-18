var APP_ITEMS = false;

var LOG = function(msg) {
  window.console.log(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
  return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var getWebViewSrc2 = function() {
  return "data:text/html,<body bgcolor=red>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var getWebViewSrc3 = function() {
  return "data:text/html,<body bgcolor=yellow>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var getWebViewSrc4 = function() {
  return "data:text/html,<body bgcolor=green>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var getWebViewSrc5 = function() {
  return "data:text/html,<body bgcolor=gray>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var showLogInDiv = function(msg) {
  document.querySelector('#log').innerText += msg + '\n';
};

window.onload = function() {
  var w2 = document.createElement('webview');
  w2.id = 'webview2';
  w2.src = getWebViewSrc2();
  document.querySelector('#container').appendChild(w2);
  w2.contextMenus.create(
      {'title': 'webview2.baz',
       'id': 'precalcid',
       'onclick': function() { showLogInDiv('webview2.baz CLICK'); }},
      function() {LOG('hi'); });
  w2.contextMenus.create(
      {'title': 'webview2.foo',
       'onclick': function() { showLogInDiv('webview2.foo CLICK'); }},
      function() {LOG('hi'); });
  w2.contextMenus.create(
      {'title': 'SAMEID_1',
       'onclick': function() { showLogInDiv('webview2.SAMEID_1 CLICK'); },
       'id': 'SAMEID_1'},
      function() { showLogInDiv('webview2.SAMEID_1 created'); })

  var props = [];
  for (var p in w2.contextMenus) props.push('' + p);
  showLogInDiv('**************** props in w2.contextMenus: ' + props.join(','));

  w2.contextMenus.onClicked.addListener(function(e) {
    LOG('w2.[global].onClicked FIRE');
    showLogInDiv('w2.[global].onClicked FIRE');
  });
};
