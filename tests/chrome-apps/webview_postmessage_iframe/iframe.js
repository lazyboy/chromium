window.esource = null;
var $ = function(id) { return document.getElementById(id); };
var log = function(msg) { $('log').innerText += msg + '-'; };

var sendPostMessage = function() {
  var webview = window.top.document.querySelector('webview');
  var value = $('ii').value;
  webview.contentWindow.postMessage(value, '*');
};

var updateSourceStatus = function() {
  $('sstatus').innerText += window.esource ? 'YES,' : 'NO,';
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
  window.esource = e.source;
  updateStatus(e);
};

var init = function() {
  $('send-button').onclick = sendPostMessage;
};

window.onload = function() {
  init();
};
