var LOG = function(msg) {
  //window.console.log(msg);
};

var container;
var element;
var state = 0;
var currentWidth = 100;
var src = 'http://www.google.com';

var $ = function(id) {
  return document.getElementById(id);
};

var onLoadstop = function(e) {
  LOG('onLoadstop');
  state = 2;
};

var tick = function() {
  LOG('tick, state = ' + state);
  switch (state) {
    case 0:
      state = 1;
      element = document.createElement('webview');
      element.style.width = '100px';
      element.style.height = '300px';
      element.src = src;
      element.addEventListener('loadstop', onLoadstop);
      currentWidth = 100;
      container.appendChild(element);
      break;
    case 1:
      break;
    case 2:
      ++currentWidth;
      element.style.width = currentWidth + 'px';
      break;
    default:
      break;
  }
};

var tock = function() {
  state = 0;
  element.parentNode.removeChild(element);
  currentWidth = 100;
};

window.onload = function() {
  container = $('webview-container');

  window.setInterval(tick, 0);
  window.setInterval(tock, 3000);
};
