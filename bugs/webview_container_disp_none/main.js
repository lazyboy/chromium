var LOG = function(msg) {
  window.console.log(msg);
};

window.onload = function() {
  var cur = 0;
  window.setInterval(function() {
    var elements = document.getElementsByClassName('webview-container');
    for (var i = 0; i < elements.length; ++i) elements[i].style.display = 'none';
    elements[cur].style.display = ''
    cur = (cur + 1) % 3
  }, 300);
};
