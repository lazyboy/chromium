window.esource = null;
var $ = function(id) { return document.getElementById(id); };
var log = function(msg) { $('log').innerText += msg + '-'; };

var sendPostMessage = function() {
  var webview = document.querySelector('webview');
  var value = $('ii').value;
  webview.contentWindow.postMessage(value, '*');
};

var updateStatus = function(e) {
  var hasSource = !!e.source;
  var sourceHTML = hasSource ?
      '<span style="color:green">YES</span>' :
      '<span style="color:red">NO</span>';
  $('mstatus').innerHTML =
      ' [event.data]: ' + e.data +
      ', [event.origin]: ' + e.origin +
      ', [event.source]: ' + sourceHTML;
};

window.onmessage = function(e) {
  //log('receive postMessage: ' + e.data);
  window.esource = e.source;
  updateStatus(e);
};

var init = function() {
  $('send-button').onclick = sendPostMessage;
};

window.onload = function() {
  init();
};
