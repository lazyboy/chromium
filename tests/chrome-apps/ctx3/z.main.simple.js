var LOG = function(msg) {
  window.console.log(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
  return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest</body>";
};

var showLogInDiv = function(msg) {
  document.querySelector('#log').innerText += msg + '\n';
};

window.onload = function() {
  var src = getWebViewSrc();

  var w = document.createElement('webview');
  w.id = 'webview1';

  w.addEventListener('loadstop', function(e) {
    LOG('webview1.loadstop');
    LOG('BEG contextMenus.create');
    var menuItem = w.contextMenus.create(
        {'title': '1.1',
         'onclick': function() { showLogInDiv('webview1.bar CLICK'); }},
        function() {LOG('hi'); });
    LOG('END contextMenus.create');
  });

  w.src = src;
  document.querySelector('#container').appendChild(w);

  w.contextMenus.create(
      {'title': '1.2',
       'id': 'precalcid',
       'onclick': function() { showLogInDiv('webview1.2 inline onclick'); }},
      function() {LOG('created 1.2'); });
  w.contextMenus.create(
      {'title': '1.3',
       'onclick': function() { showLogInDiv('webview1.3 inline onclick'); }},
      function() {LOG('hi'); });
  w.contextMenus.create(
      {'title': 'SAMEID_1',
       'onclick': function() { showLogInDiv('webview1.SAMEID_1 inline onclick'); },
       'id': 'SAMEID_1'},
      function() { showLogInDiv('webview1.SAMEID_1 created'); })

  var props = [];
  for (var p in w.contextMenus) props.push('' + p);
  showLogInDiv('**************** props in w.contextMenus: ' + props.join(','));

  w.contextMenus.onClicked.addListener(function(e) {
    LOG('w1.[global].onClicked FIRE');
    showLogInDiv('w1.[global].onClicked FIRE');
  });

  chrome.contextMenus.onClicked.addListener(
      function() {
        LOG('WRONG');
        LOG('WRONG');
        LOG('WRONG');
      });

  var hasListeners = chrome.contextMenus.onClicked.hasListeners();
  window.console.log('chrome.contextMenus.onClicked.hasListeners: ' + hasListeners);

  LOG('**** begin APP.create');
  chrome.contextMenus.create(
      {
        'title': 'chrome.contextMenus.create',
        //'onclick': function() { LOG('TOP_LEVEL clicked'); },
        'id': 'temporary_id'
      }, function() {
        LOG('*** chrome.contextMenus.create created');
      });

  /*
  chrome.contextMenus.onClicked.addListener(function(a, b) {
    LOG('embedder chrome.contextMenus.onClicked fired');
  });
  */
};
