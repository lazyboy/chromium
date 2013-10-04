var $ = function(id) {
  return document.getElementById(id);
};
var LOG = function(msg) { window.console.log(msg); };

var webview;

window.onload = function() {
  webview = $('first');
  var src = 'http://jsbin.com/UPiS/1/';
  webview.addEventListener('loadstop', function(e) { LOG('loadstop'); });
//  webview.overrideUserAgent('foobar');
  webview.onBeforeRequest.addListener(function(details) {
    LOG('onBeforeRequest');
    LOG('url was: ' + details.url);
    /*
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        var ua = details.requestHeaders[i].value;
        LOG('UA: ' + ua);
      }
    }
    */
  }, {
    urls: ['<all_urls>']
  });

  webview.onBeforeSendHeaders.addListener(function(details) {
    LOG('onBeforeSendHeaders');
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        var ua = details.requestHeaders[i].value;
        LOG('UA: ' + ua);
      }
    }
  }, {
    urls: ['<all_urls>']
  }, ['blocking', 'requestHeaders']);
  webview.setAttribute('src', src);

  $('button-id').onclick = function(e) {
    $('status-div').innerText = navigator.userAgent;
  };
};
