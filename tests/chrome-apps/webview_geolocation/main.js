window.onload = function() {
  var webview1 = document.getElementById('webview1');
  webview1.addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest (1)');
    window.console.log('permissionrequest.type: ' + e.type);
    //e.request.allow();
    //e.request.deny();
    window.console.log('going to preventDefault');
    e.preventDefault();
  });
  //document.querySelector('webview').src = 'http://jsbin.com/azayiv/1';
  if (1 ==1) return;

  var webview2 = document.getElementById('webview2');
  webview2.addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest (2)');
    window.console.log('permissionrequest.type: ' + e.type);
    e.request.allow();
    //e.request.deny();
  });

  var webview3 = document.getElementById('webview3');
  webview3.addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest (3)');
    window.console.log('permissionrequest.type: ' + e.type);
    e.request.allow();
    //e.request.deny();
  });

  var webview4 = document.getElementById('webview4');
  webview4.addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest (4)');
    window.console.log('permissionrequest.type: ' + e.type);
    e.request.allow();
    //e.request.deny();
  });

  var webview0 = document.getElementById('webview0');
  webview0.addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest (0)');
    window.console.log('permissionrequest.type: ' + e.type);
    e.request.allow();
  });
};
