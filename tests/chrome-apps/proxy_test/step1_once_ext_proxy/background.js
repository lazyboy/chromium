// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var LOG = function(msg) { window.console.log(msg); };
var $ = function(id) { return document.getElementById(id); };

// Modified from chrome-apps-sample.
document.addEventListener("DOMContentLoaded", function () {
  setProxy();
});

var setProxy = function() {
  LOG('setProxy');
  // Set proxy for foobar.com
  var config = {
    mode: 'fixed_servers',
    rules: {
      proxyForHttp: {
        scheme: 'http',
        port: 1235,
        host: '127.0.0.1'
      },
      bypassList: ['foobar.com']
    }
  };
  chrome.proxy.settings.set({
    value: config,
    scope: 'regular'
  }, function() { LOG('chrome.proxy.settings.set callback'); });
};

var clearProxy = function() {
  LOG('clearProxy');
  chrome.proxy.settings.clear({
    scope: 'regular'
  }, function() { LOG('chrome.proxy.settings.clear callback'); });
};
