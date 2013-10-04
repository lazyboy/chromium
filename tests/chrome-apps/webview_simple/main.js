var addWebview = function(src) {
  var w = document.createElement('webview');
  w.setAttribute('src', src);
  document.body.appendChild(w);
};

window.onload = function() {
  //addWebview('data:text/html,another foobar');
  //addWebview('chrome://newtab');
  window.setTimeout(function() {
    window.console.log('add newtab page');
    //addWebview('chrome://newtab');
    addWebview('https://www.foobar.com');
  }, 500);
};
