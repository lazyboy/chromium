window.onload = function() {
  document.querySelector('webview').addEventListener('dialog', function(e) {
    window.console.log('DIALOG event');
    document.getElementById('logs').innerHTML += '<br>Dialog event';
    e.dialog.cancel();
  });
};
