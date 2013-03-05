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

// TODO:
// 1. attribute mutation: make custom setter and getter that can be computer?
// 2. attribute mutaiton: make custom call (to <object>) from getter/setter.
// 3. <x-webview> -> <webview>.

var myValue = 10;
// Shim related.

// TODO: This does not get called.
var WebView = function() {
  //goog.base(this);

  LOG('WebView.constructor');
  myValue += 10;
};
goog.inherits(WebView, HTMLElement);

// This gets called.
WebView.prototype.testMe = function() {
  console.log('tested!');
  if (this.value_) this.value_++;
  else this.value_ = 10;
  console.log('updated value: ' + this.value_);
  return this.getAttribute('src');
};

var barProperty = {
};

var getDocumentRegisterParamsForWebView = function() {
  LOG('getDocumentRegisterParamsForWebView');
  return {
    prototype: Object.create(WebView.prototype, {
        foo: {value: 'bar'}
    })
  };
};

var webViewConstructor = document.register(
    'x-webview',
    getDocumentRegisterParamsForWebView());

var getDocumentRegisterParamsForWebViewCtorVersion = function() {
  LOG('getDocumentRegisterParamsForWebViewCtorVersion');
  return {
    //prototype: new WebView()
    //prototype: WebView.prototype
    prototype: Object.create(WebView.prototype)
  };
};

var webViewConstructorCtor = document.register(
    'x-webview-ctor',
    getDocumentRegisterParamsForWebViewCtorVersion());

// ----------------------------- Entry point ----------------------------------
var startTestOne = function() {
  LOG('startTestOne');
  var xWebViewElement = document.createElement('x-webview');
  $('x-webview-container').appendChild(xWebViewElement);
};

var startTestTwo = function() {
  LOG('startTestTwo');

  var xWebViewElement = document.createElement('x-webview-ctor');
  LOG('created <x-webview> element using document.createElement.');

  g_ = xWebViewElement;
  $('x-webview-container').appendChild(xWebViewElement);
};

var startTestThree = function() {
  LOG('startTestThree');

  g_ = document.querySelectorAll('x-webview-ctor')[0];
};

var startTest = function() {
};


