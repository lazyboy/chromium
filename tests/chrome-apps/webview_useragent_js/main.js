var $ = function(id) {
  return document.getElementById(id);
};
var LOG = function(msg) { window.console.log(msg); };

var wv1;
var wv2;
var guest_url = 'http://jsbin.com/UPiS/2/';

var loadJSWebView = function() {
  wv2 = $('second');
  var src = 'http://jsbin.com/UPiS/2/';

  var runBookmarklet = function(webview, code) {
    webview.src = 'javascript:' + code;
  };

  var manifest = {};
  manifest.version = '123';
  manifest.name = 'sample';

  wv2.addEventListener('loadstop', function(e) {
    LOG('[second].loadstop');
    runBookmarklet(wv2,
          "var defaultUserAgent=navigator.userAgent;navigator.__defineGetter__('userAgent',function(){return ('foobar3');navigator.__defineGetter__('appVersion',function(){return '"+
          manifest.version+
          "';});navigator.__defineGetter__('appName',function(){return '"+
          manifest.name+
          "';});navigator.__defineGetter__('appCodeName',function(){return 'Google Chrome App';});");
    LOG('[second].done runBookmarklet');
  });


  // Check for sent user-agent.
  wv2.onBeforeSendHeaders.addListener(function(details) {
    LOG('[second].onBeforeSendHeaders');
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        var ua = details.requestHeaders[i].value;
        LOG('[second].UA: ' + ua);
      }
    }
  }, {
    urls: ['<all_urls>']
  }, ['blocking', 'requestHeaders']);

  wv2.setAttribute('src', guest_url);
};

window.onload = function() {
  wv1 = $('first');
  wv1.addEventListener('loadstop', function(e) { LOG('loadstop'); });
//  wv1.overrideUserAgent('foobar');
  wv1.setUserAgentOverride('foobar');
  wv1.onBeforeRequest.addListener(function(details) {
    /*
    LOG('[first].onBeforeRequest');
    LOG('[first].url was: ' + details.url);
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        var ua = details.requestHeaders[i].value;
        LOG('UA: ' + ua);
      }
    }
    */
  }, {
    urls: ['<all_urls>']
  });

  wv1.onBeforeSendHeaders.addListener(function(details) {
    LOG('[first].onBeforeSendHeaders');
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        var ua = details.requestHeaders[i].value;
        LOG('[first].UA: ' + ua);
      }
    }
  }, {
    urls: ['<all_urls>']
  }, ['blocking', 'requestHeaders']);
  wv1.setAttribute('src', guest_url);

  $('button-id').onclick = function(e) {
    $('status-div').innerText = navigator.userAgent;
  };

  loadJSWebView();
};
