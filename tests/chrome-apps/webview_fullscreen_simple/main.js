var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

var init = function() {
  var w2 = $('w2');
  if (w2) {
    w2.addEventListener('consolemessage', function(e) {
      LOG('G: ' + e.message);
    });
    LOG('adding consolemessage handler');
  }
};

window.onload = function() {
  init();
  var count = 0;
  $('w2').addEventListener('permissionrequest', function(e) {  // github page.
    window.console.log('permissionrequest: e.permission: ' + e.permission);
    if (e.permission !== 'fullscreen') return;
    window.console.log('w2.permissionrequest.fullscreen');
    window.console.log('url: ' + e.url);
    e.request.allow();
    ++count;
  });
  LOG('registered click');
};
