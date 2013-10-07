var $ = function(id) {
  return document.getElementById(id);
};
var LOG = function(msg) {
  window.console.log(msg);
};

var clearWebView = function(webview) {
  LOG('clearButton');
  //var webview = document.querySelector('webview');
  if (!webview) {
    LOG('<webview> not found');
    return;
  }
  var removeMask = $('remove_mask').value;
  LOG('BEG clearStorage');
  LOG('removeMask: ' + removeMask);
//  webview.clearStorage(removeMask);
  
  webview.clearData({'since': 1234}, {
'cookies': true,
'localStorage': true
}, function() { window.console.log('DONE'); });

  LOG('END clearStorage');
};

var clearButton = function(e) { clearWebView(document.querySelector('webview')); };
var clearButton2 = function(e) { clearWebView($('second')); };


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
  $('clear-button2').onclick = clearButton2;
  $('show-emb').onclick = showEmbedderCookies;
  $('add-emb').onclick = addAnEmbedderCookie;
  $('rem-emb').onclick = removeAnEmbedderCookie;
};
