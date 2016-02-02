var APPCACHE_SRC = 'http://appcache.offline.technology/demo/';
var $ = function(id) { return document.getElementById(id); };

window.onload = function() {
  var w = $('mwebview');
  console.log('setting src: ' + APPCACHE_SRC);
  w.src = APPCACHE_SRC;
  $('reload').onclick = function(e) {
    w.src = APPCACHE_SRC;
  };
};
