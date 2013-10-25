var LOG = function(msg) {
  window.console.log(msg);
};

window.onload = function() {
  LOG('app.window.onload');
  var webview = document.querySelector('webview');

  webview.addEventListener('loadstop', function(e) {
    LOG('loadstop');
  });

  webview.addEventListener('permissionrequest', function(e) {
    LOG('permissionrequest.type: ' + e.type);
    if (e.permission == 'media') {
      e.request.allow();
    }
  });

  webview.setAttribute('src', 'http://jsbin.com/oZUHeBO/1');
};
