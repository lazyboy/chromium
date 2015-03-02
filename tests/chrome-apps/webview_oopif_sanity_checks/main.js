var LOG = function(msg) { window.console.log(msg); };

var addWebview = function(src) {
  var w = document.createElement('webview');
  w.setAttribute('src', src);
  w.style.width = '90%';
  w.style.height = '90%';
  document.body.appendChild(w);
};

window.onload = function() {
  var inputBox = document.getElementById('input-url');
  document.getElementById('submit-button').onclick = function(e) {
    var url = inputBox.value;
    LOG('submit-button click, url: ' + url);
    document.querySelector('webview').src = url;
  };
  document.getElementById('execute-script-button').onclick = function(e) {
    LOG('calling executeScript');
    LOG('calling executeScript');
    LOG('calling executeScript');
    document.querySelector('webview').executeScript(
        {code: 'document.body.style.backgroundColor = "red";'},
        function resultsCallback(results) {
          LOG('Embedder executeScript.resultsCallback');
          LOG(results);
        });
  };
  document.getElementById('message-button').onclick = function(e) {
    document.querySelector('webview').src = url;
  };
  /*
  // history is not available for packaged apps.
  var historyLengthButton = document.getElementById('history-length-button');
  var historyLengthSpan = document.getElementById('history-length-span');
  historyLengthButton.onclick = function(e) {
    LOG('historyLengthButton click');
    var l = window.history.length;
    historyLengthSpan.innerText = l;
  };
  */

  /*
  document.getElementById('back-button').onclick = function(e) {
    LOG('back-button click');
    document.querySelector('webview').back();
  };
  document.getElementById('fwd-button').onclick = function(e) {
    LOG('fwd-button click');
    document.querySelector('webview').forward();
  };
  */
};
