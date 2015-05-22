var $ = function(id) {
  return document.getElementById(id);
};
var setUp = function() {
  var dragSrc = $('embedder-src');

  var w = document.querySelector('webview');
  w.addEventListener('consolemessage', function(e) {
    window.console.log('g: ' + e.message);
  });
};

window.onload = function() {
  setUp();
};
