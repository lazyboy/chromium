var LOG = function(msg) {
  window.console.log(msg);
};

var addWebview = function(src) {
  var w = document.createElement('webview');
  w.setAttribute('src', src);
  w.style.width = '90%';
  w.style.height = '90%';
  document.body.appendChild(w);
};

var setUpGuest = function() {
  var w = document.createElement('webview');
  w.setAttribute('partition', 'persist:privileged');
  w.style.width = '100%';
  w.style.height = '100%';
  document.body.appendChild(w);
  //w.src = 'http://jsbin.com/boqeki/1/';
  w.src = 'http://127.0.0.1/guest_worker/guest.html';
  return w;
};

var runStuff = function() {
  LOG('runStuff');
  var webview = setUpGuest();
  webview.addEventListener('permissionrequest', function(e) {
    LOG('permissionrequest: ' + e.permission);
    var p = e.permission;
    if (p == 'filesystem') {
      e.request.allow();
    }
  });
  webview.addEventListener('consolemessage', function(e) {
    LOG('g: ' + e.message + ' at line: ' + e.line);
  });
};

window.onload = function() {
  runStuff();
};

