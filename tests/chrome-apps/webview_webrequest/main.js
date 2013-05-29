var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

window.onload = function() {
  $('webview-container').innerHTML =
      '<webview style="width: 100%; height: 100%;"></webview>';
  var webview = document.querySelector('webview');

  var firstRun = true;
  webview.addEventListener('loadstop', function(e) {
    LOG('webview.loadstop');
    if (!firstRun) return; else firstRun = false;
    webview.onCompleted.addListener(function(details) {
      LOG('webview webRequest onCompleted');
      LOG('statusCode: ' + details.statusCode + ', url: ' + details.url);
    }, {urls: ['<all_urls>']});
  });
  webview.setAttribute('src', 'http://www.google.ca');
};
