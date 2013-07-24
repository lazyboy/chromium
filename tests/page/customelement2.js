// ----------------------------------------------------------------------------
var $ = function(id) {
  return document.getElementById(id);
};

var LOG = function(msg) {
  window.console.log(msg);
  var logElement = $('log');
  if (logElement) {
    var row = document.createElement('div');
    row.innerText = msg;
    $('log').appendChild(row);
  }
};

// Closure library.
var goog = {};
goog.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};
goog.base = function(me) {
  var caller = arguments.callee.caller;
  if (caller.superClass_) {
    // This is a constructor. Call the superclass constructor.
    return caller.superClass_.constructor.apply(
        me, Array.prototype.slice.call(arguments, 1));
  }
};
// End Closure library.

document.register = document.register || document.webkitRegister;
// ----------------------------------------------------------------------------

var g_;

// TODO (some are obsolete).
// 1. attribute mutation: make custom setter and getter that can be computed?
// 2. attribute mutaiton: make custom call (to <object>) from getter/setter.
// 3. <x-webview> -> <webview>.

var webviewProto = Object.create(HTMLElement.prototype);

webviewProto.createdCallback = function() {
  LOG('webviewProto.createdCallback');
  LOG('createdCallback time src value: ' + this.src);
  // Is it possible to hide this.src_?
  this.src_ = this.getAttribute('src');
  Object.defineProperty(this, 'src', {
    get: function() { LOG('src.get'); return this.src_; },
    set: function(value) { LOG('custom.set'); this.setAttribute('src', value); return this.src_; },
    enumerable: true
  });
  // Create shadow etc.
};

webviewProto.attributeChangedCallback = function(attribute, prev, curr) {
  LOG('change: ' + attribute + ', from ' + prev + ' to ' + curr);
};

webviewProto.canGoBack = function() { LOG('canGoBack?'); return true; };
// Now we can do document.querySelector('x-webview').sayFoo();

clickHandler = function(e) {
  LOG('clickHandler');
  var el = e.target;
  el.canGoBack();
};

document.register('x-webview', {prototype: webviewProto});

