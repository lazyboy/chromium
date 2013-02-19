var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

var MIN_RANGE = 200;
var MAX_RANGE = 480;

var H = MIN_RANGE;
var step = 5;

var increaseHeight = function() {
  if (H >= MAX_RANGE || H < MIN_RANGE) {
    step = -step;
  }

  H += step;
  LOG('Call increaseHeight, H = ' + H);
  var webview = document.querySelector('webview');
  webview.setAttribute('maxheight', H + 'px');
  window.setTimeout(increaseHeight, 10);
};

var setUp = function() {
  increaseHeight();
};

onload = function() {
  setUp();
};
