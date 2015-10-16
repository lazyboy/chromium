function Test() {
  this.runCount_ = 0;
};

Test.prototype.run = function() {
  // Pre-existing webview in DOM.
  this.runInternal_(document.querySelector('webview'));

  // Javascript created webview.
  var jsWebview = new WebView();
  document.body.appendChild(jsWebview);
  this.runInternal_(jsWebview);

  // Javascript DOM webview.
  var jsDOMWebview = document.createElement('webview');
  document.body.appendChild(jsDOMWebview);
  this.runInternal_(jsDOMWebview);
};

Test.prototype.runInternal_ = function(webview) {
  var runCount = this.runCount_++;
  webview.oncontentload = function(e) {
    window.console.log('contentload: ' + runCount);
    webview.executeScript(
      {code: 'window.console.log("hello");'}, function(results) {
        if (!results) {
          window.console.log('FATAL: failed ' + runCount);
        }
    });
  };
  webview.src = 'http://www.google.ca';
};

window.onload = function() {
  var tester = new Test();
  tester.run();
};
