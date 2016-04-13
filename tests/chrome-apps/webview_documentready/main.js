var LOG = function(msg) { window.console.log(msg); };


var doTest = function() {
  LOG('doTest');
  var w = document.querySelector('webview');
  LOG('webview element: ' + w);

  Object.defineProperty(w, 'name', {
    get: function() { return 'abc'; },
    set: function(value) {}, enumerable: true
  });
};

document.addEventListener('DOMContentLoaded', function(e) {
  LOG('L2. app document.DOMContentLoaded');
  doTest();
});

//window.addEventListener('DOMContentLoaded', function(e) {
//  LOG('app window.DOMContentLoaded');
//  doTest();
//});

window.onload = function() {
  LOG('window.onload');
  document.getElementById('open').onclick = function() {
    window.open(
        'chrome-extension://hcopflpnddjdbddphocgkfkhlpoclcgb/main.html',
        '_self');
  };
};

