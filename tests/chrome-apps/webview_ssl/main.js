var addWebview = function(src) {
  var w = document.createElement('webview');
  w.setAttribute('src', src);
  document.body.appendChild(w);
};

window.onload = function() {
  addWebview('https://foobar.com');
};
