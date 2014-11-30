var LOG = function(msg) {
  window.console.log(msg);
};

var setWebview = function(src) {
  var w = document.querySelector('webview');
  w.setAttribute('src', src);
};

window.onload = function() {
  //window.console.log('got window.dataUrl: ' + window.dataUrl);
  var d = chrome.app.window.current().dataUrl;
  window.console.log('got chrome.app.window.current().dataUrl: ' + d);

  setWebview(d);
};
