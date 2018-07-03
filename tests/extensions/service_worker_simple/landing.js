var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) {
  console.log(msg);
  $('logs').innerText += msg + '\n';
};

window.onload = function() {
  /*
  $('fetch').onclick = function() {
    console.log('onclick fire');
    fetch(chrome.runtime.getURL('./fetch_trap')).then(function(response) {
      LOG('fetch successful');
      return response.text();
    }).then(function(textResponse) {
      LOG(textResponse);
      $('output').innerText += 'RESP: ' + textResponse + '\n';
    }).catch(function(err) {
      LOG(err);
    });
  };
  */
  console.log(chrome.runtime.id);
  $('register').onclick = function(e) {
    LOG('register onclick');
    //var workerUrl = './worker1.js';
    var workerUrl = chrome.runtime.getURL('worker1.js');
    console.warn(workerUrl);
    navigator.serviceWorker.register(workerUrl).then(function(r) {
      return navigator.serviceWorker.ready;
    }).then(function(registration) {
      LOG('registration ready');
      var sw = registration.active;
      window.sw = sw;
    }).catch(function(err) {
      LOG('SW registration error: ' + err);
    });
  };
  $('ping').onclick = function(e) {
    if (!window.sw) { LOG('no SW registered'); return; }
    var mc = new MessageChannel();
    mc.port1.onmessage = function(e) {
      LOG('received msg from SW: ' + e.data);
    };
    window.sw.postMessage('ping', [mc.port2]);
  };
};

