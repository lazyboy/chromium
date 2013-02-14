var LOG = function(msg) {
  window.console.log(msg);
};

LOG('__defineSetter__ setup begin.');
Object.prototype.__defineSetter__('magicallow', function(value) {
  LOG('__defineSetter__ invoke');
  LOG('+++++++++++++++++++++++++++++++++');
  LOG('+++++++++++++++++++++++++++++++++');
  LOG('+++++++++++++++++++++++++++++++++');
  LOG('+++++++++++++++++++++++++++++++++');
});
LOG('__defineSetter__ setup end.');

LOG('GCController: ' + typeof window.GCController);

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
  /*
  webview.addEventListener('foobar', function(e) {
    LOG('::FIRE.fooevent');
    LOG('e.detail = ' + e.detail);
//    window.detail123 = e.detail;
    LOG('e.allow = ' + e.allow);
//    e.allow();
    LOG('e.deny = ' + e.deny);
//    e.deny();
  });
  */
  webview.addEventListener('foobar', function(e) {
    LOG('::FIRE.fooevent');
    LOG('e.detail = ' + e.detail);
    LOG('e.request = ' + e.request);
    if (e.request) {
      window.setTimeout(function() {
        window.console.log('try to call allow now ...');
        e.request.allow();
      //}, 15000);
      }, 100);
      LOG('e.request.allow = ' + e.request.allow);
//      e.request.allow();
      LOG('e.request.deny = ' + e.request.deny);
//      e.request.deny();
    }
  });

  /*
  var div = document.createElement('div');
  div.innerHTML = 'click me';
  div.onclick = function() { window.console.log('on click: ' + window.detail123); delete window.detail123; };
  document.body.appendChild(div);
  var goDiv = document.createElement('div');
  goDiv.innerHTML = 'Click to test go().';
  goDiv.onclick = function() {
    LOG('making a crazy <webview>.go(1234)');
    webview.go(1234);
    LOG('making another crazy <webview>.go({a:1})');
    webview.go({a:1});
    LOG('making another crazy <webview>.go("test me test me test me")');
    webview.go('test me test me test me');
    webview.go('1234');
  };
  document.body.appendChild(goDiv);
  */
};
