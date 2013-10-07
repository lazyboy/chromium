var LOG = function(msg) { window.console.log(msg); };
var $ = function(id) { return document.getElementById(id); };

var clearGuestStorage = function(e) {
  LOG('beg clearGuestStorage');
  var webview = document.querySelector('webview');
  if (!webview) { LOG('<webview> not found'); }
  webview.clearStorage();
  LOG('end clearGuestStorage');
};

window.onload = function() {
  LOG('embedder.window.onload');
  $('button-clear').onclick = clearGuestStorage;
};

