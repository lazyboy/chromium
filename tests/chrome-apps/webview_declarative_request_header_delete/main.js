var $ = function(id) { return document.getElementById(id); }

var loadWebview = function(doWebRequest) {
  var w1 = document.createElement('webview');

  var headerRemoveRule = {
    conditions: [
      new chrome.webViewRequest.RequestMatcher()
    ],
    actions: [
      new chrome.webViewRequest.RemoveResponseHeader({
        name: 'x-robots-tag'
      })
    ]
  };


  if (doWebRequest) {
    // declarative WR.
    w1.request.onRequest.addRules([headerRemoveRule]);
  }

  w1.src = 'https://jsbin.com/piwakil';
  document.body.appendChild(w1);
};

window.onload = function() {
  $('run1').onclick = function() {
    loadWebview(false);
  };
  $('run2').onclick = function() {
    loadWebview(true);
  };
};
