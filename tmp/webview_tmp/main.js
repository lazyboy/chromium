var testD = function() {
  console.log('start testD');
  var webview = document.createElement('webview');
  webview.setAttribute('id', 'webview');
  webview.setAttribute('partition', 'persist:myapp');
  webview.setAttribute('src', 'data:text/html,Loading...');

  var firstLoad = function() {
    window.console.log('first load');
    webview.removeEventListener('loadstop', firstLoad);
    webview.onBeforeRequest.addListener(function(details) {
      console.log('onBeforeRequest');
      console.log(details);
    }, { urls: ['<all_urls>']}, ['blocking']) ;
    webview.src = 'http://www.google.com';
  };
  webview.addEventListener('loadstop', firstLoad);
  document.body.appendChild(webview);
};

window.onload = function() {
  testD();
};


