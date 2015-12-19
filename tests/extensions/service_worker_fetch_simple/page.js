var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) {
  console.log(msg);
  $('logs').innerText += msg + '\n';
};

window.onload = function() {
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
  $('register').onclick = function(e) {
    LOG('register onclick');
    navigator.serviceWorker.register('./worker1.js').then(function(r) {
      return navigator.serviceWorker.ready;
    }).then(function(registration) {
      LOG('registration ready');
      var sw = registration.active;
    }).catch(function(err) {
      LOG('SW registration error: ' + err);
    });
  };
};
