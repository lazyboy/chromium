window.onload = function() {
  document.querySelector('webview').addEventListener('permissionrequest', function(e) {
    window.console.log('Embedder got permissionrequest');
    window.console.log('permissionrequest.type: ' + e.type);
    window.console.log('permissionrequest.requestMethod: '+ e.requestMethod);
    window.console.log('allowing');
    e.request.allow();
    //e.request.deny();
  });
  //document.querySelector('webview').src = 'http://jsbin.com/azayiv/1';
};
