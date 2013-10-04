var $__ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

window.onload = function() {
  var src = 'http://jsbin.com/otisep/2/';
  /*
  $__('go1').onclick = function(e) {
    LOG('new go');
    var w = $('#myid');
//    w.get(0).partition = 'persist:jq123';
    w.attr('partition', 'persist:jq123');
    w.attr('src', 'http://twitter.com');
//    w.src = 'https://twitter.com';
    //$__('myid').src = 'http://twitter.com';
  };
  */
  /*
  $__('go1').onclick = function(e) {
    LOG('go1 click v3');
    var w = document.querySelector('webview');
    //w.setAttribute('partition', 'persist:foobar123');
    //w.src = src;
    
    w.setAttribute('partition', 'persist:foobar125');
    w.setAttribute('src', src);
  };
  */
  $__('go1').onclick = function(e) {
    LOG('go1 click v1');
    var w = document.querySelector('webview');
    w.partition = 'persist:foobar2';
//    window.setTimeout(function() {
//      w.setAttribute('src', src);
//    }, 0);
    //w.src = src;
    w.setAttribute('src', src);
  };
  $__('go2').onclick = function(e) {
    LOG('go2 click v1');
    var w = document.querySelector('webview');
    //w.src = src;
    //w.setAttribute('src', src);
//    w.partition = 'persist:foobar6';
    w.setAttribute('partition', 'persist:foobar6');
    w.src = src;
//    w.setAttribute('partition', 'persist:foobar2');
//    w.setAttribute('src', 'http://twitter.com');
//    w.setAttribute('partition', 'persist:foobar3');
//    w.partition = 'persist:foobar4';
    window.setTimeout(function() {
//      w.setAttribute('src', src);
    }, 0);
//    w.src = src;
  };
};
