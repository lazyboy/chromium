var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

window.onload = function() {
  var src = 'http://jsbin.com/otisep/2/';
  $('go1').onclick = function(e) {
    LOG('go1 click');
    var w = document.querySelector('webview');
    w.partition = 'persist:foobar';
    window.setTimeout(function() {
      w.setAttribute('src', src);
    }, 2000);
  };
  $('go2').onclick = function(e) {
    LOG('go2 click');
    var w = document.querySelector('webview');
    w.setAttribute('partition', 'persist:foobar');
    window.setTimeout(function() {
      w.setAttribute('src', src);
    });
  };
};
