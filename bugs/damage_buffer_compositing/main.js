var LOG = function(msg) { window.console.log(msg); };

var webview;

var doingResize = false;
var w = 200; var dW = 2; var minW = 100; var maxW = 600;
var doCrazyResize = function() {
  if (!doingResize) return;
  if (w + dW < minW || w + dW > maxW) dW = -dW;
  w += dW;
  webview.style.width = w + 'px';
  window.setTimeout(doCrazyResize, 10);
};

var doCrazyResizeClick = function(e) {
  doingResize = !doingResize;
  document.getElementById('crazy-resize').innerHTML =
      (doingResize ? 'Stop' : 'Start') + ' resize';
  doCrazyResize();
};

var isCompositedPage = false;
var flipSrcCompositingPage = function(e) {
  if (isCompositedPage) {
    webview.src = 'http://jsbin.com/ixomuz/1';
    LOG('changed src to contain regular page');
  } else {
    webview.src = 'data:text/html,non-animation-hello';
    LOG('changed src to contain css anim');
  }
  isCompositedPage = !isCompositedPage;
};

window.onload = function() {
  webview = document.querySelector('webview');
  document.getElementById('crazy-resize').onclick = doCrazyResizeClick;
  document.getElementById('change-src').onclick = flipSrcCompositingPage;
};
