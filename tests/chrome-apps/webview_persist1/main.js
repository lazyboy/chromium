var $ = function(id) {
  return document.getElementById(id);
};
var LOG = function(msg) {
  window.console.log(msg);
};

var clearButton = function(e) {
  LOG('clearButton');
  var webview = document.querySelector('webview');
  if (!webview) {
    LOG('<webview> not found');
    return;
  }
  LOG('BEG clearStorage');
  webview.clearStorage();
  LOG('END clearStorage');
};

var c = goog.net.cookies;
var curAdd = 1;
var curDel = 1;
var showEmbedderCookies = function() {
  var msg = 'BEG showEmbedderCookies, ';
  var keys = c.getKeys(), vals = c.getValues();
  for (var i = 0; i < keys.length; ++i) msg += keys[i] + ' - ' + values[i] + ', ';
  msg += 'END showEmbedderCookies';
  LOG(msg);
};
var addAnEmbedderCookie = function() {
  try {
    c.set('foo' + curAdd, 'bar');
  } catch (ex) {
    LOG('Exception in addAnEmbedderCookie: ' + ex);
  }
  ++curAdd;
};
var removeAnEmbedderCookie = function() {
  if (curDel >= curAdd) { LOG('no custom cookies to removes'); return; }
  var cookieName = 'foo' + curDel;
  c.remove(cookieName);
  ++curDel;
};

window.onload = function() {
  LOG('window.onload');
  $('clear-button').onclick = clearButton;
  $('show-emb').onclick = showEmbedderCookies;
  $('add-emb').onclick = addAnEmbedderCookie;
  $('rem-emb').onclick = removeAnEmbedderCookie;
};
