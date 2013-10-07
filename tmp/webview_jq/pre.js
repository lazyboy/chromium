window.console.log('document.readyState = ' + document.readyState);
window.console.log('app: add listener for doc.load');
document.addEventListener('DOMContentLoaded', function(e) {
  window.console.log('document.DOMContentLoaded');
  window.console.log('window.FOO = ' + window.FOO);
  var w = document.querySelector('webview');
  window.console.log('webview: ' + w);
  window.console.log('try to Object.defineProperty');
  Object.defineProperty(w, 'name', {
    get: function() { return 'foo-name'; },
    set: function(value) { window.console.log('ignore setting name: ' + name); },
    enumerable: true,
    configurable: true
  });
  //document.body.appendChild(w);
  window.console.log('done try to Object.defineProperty');
});
