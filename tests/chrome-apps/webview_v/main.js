var LOG = function(msg) {
  window.console.log(msg);
};

window.onload = function() {
  window.console.log("E: window.onload");
  var webview = document.querySelector('webview');
  if (!webview) { LOG('no <webview>'); return; }
  //webview.src = 'data:text/html,hithere';
  webview.reload();
  webview.addEventListener('loadstop', function(e) {
    LOG('LOADSTOP');
    LOG('LOADSTOP2');
  });
  webview.addEventListener('foobar', function(e) {
    LOG('::fooevent');
    LOG('e.a = ' + e.a);
    e.a();
    LOG('e.b = ' + e.b);
    e.b();
  });
};
