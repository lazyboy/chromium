var LOG = function(msg) {
  window.console.log('EMB: ' + msg);
};

var addGuest = function() {
  window.console.log('adding guest');
  var el = document.createElement('webview');
  document.body.appendChild(el);
  var guestSrc = 'data:text/html,<body><div>Guest</div>' +
      '<input type=text name=spoken-input placeholder="say sth"' +
      '    size=50 speech x-webkit-speech id="sid">' +
      '</body>';
  window.console.log('setting src');
  window.console.log('complete setting src');

  el.addEventListener('loadstop', function(e) {
    LOG('loadstop');
    el.executeScript(
        {file:'guest_script.js'},
        function(results) { LOG('executeScript.callback'); });
  });
  el.addEventListener('consolemessage', function(e) {
    LOG('[ from GUEST]: ' + e.message);
  });
  el.addEventListener('permissionrequest', function(e) {
    LOG('ebmedder.permissionrequest, permission: ' + e.permission);
    e.request.allow();
  });

  el.setAttribute('src', guestSrc);
};

var testSpeech = function() {
  var r = new webkitSpeechRecognition();
  r.onerror = function(e) { console.log('Error: ' + e.error); };
  r.onstart = function(e) { console.log('Start'); };
  r.start();
};

var otherLoad = function() {
  var webview = document.getElementById('otherid');
  if (!webview) { LOG('FATAL: <webview> element not found'); }
  webview.onpermissionrequest = function(e) {
    LOG('ebmedder.permissionrequest[google speech], permission: ' + e.permission);
    e.request.allow();
  };
};

var allowSpeech = function(webviewElement) {
  webviewElement.addEventListener('permissionrequest',
      function(e) {
    console.log('webview requests permission: ' + e.type);
    if (e.permission === 'media') {
      console.log('allowing media permission');
      e.request.allow();
      return;
    }
  });
};

window.onload = function() {
  window.console.log('onload');

  otherLoad();
  allowSpeech(document.getElementById('google-speech-demo'));

  var el = document.getElementById('sid');
  if (el) {
    el.onspeechchange = function() { window.console.log('**** onspeechchange'); }
  } else {
    window.console.log('element not found'); return;
  }
  window.console.log('adding guest');
  addGuest();

  document.getElementById('check-emb-api').onclick = function(e) {
    LOG('check-emb-api');
    testSpeech();
  };

  document.getElementById('jsbinwv').addEventListener('consolemessage', function(e) {
    LOG('JsBin.Guest: ' + e.message);
  });
};
