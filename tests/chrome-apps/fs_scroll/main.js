var LOG = function(msg) { window.console.log(msg); };
var $ = function(id) { return document.getElementById(id); };

var init = function() {
  $('request-fullscreen').onclick = function(e) {
    $('fs').webkitRequestFullScreen();
  };
};


window.onload = function() {
  LOG('embedder.window.onload');
  init();
};

