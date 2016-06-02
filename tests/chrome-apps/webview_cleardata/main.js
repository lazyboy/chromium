var LOG = function(msg) {
  window.console.log(msg);
};

var test = function() {
  const webview = document.createElement('webview');
  webview.setAttribute('id', 'player');
  webview.setAttribute('partition', 'persist:player');
  webview.setAttribute('src', 'http://example.com'); 
  webview.addEventListener('contentload', () => {
    webview.clearData({}, { cache: true });
    webview.clearData({}, { cache: true });
  });
  document.body.appendChild(webview);
};

window.onload = function() {
  test();
};
