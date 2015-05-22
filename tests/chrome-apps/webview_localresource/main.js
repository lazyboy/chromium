window.onload = function() {
  window.console.log('Guest window.onload');
  document.querySelector('webview').onconsolemessage = function(e) {
    var msg = e.message;
    window.console.log('G: ' + msg);
  };
};
