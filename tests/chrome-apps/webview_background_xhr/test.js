// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var LOG = function(message) {
  window.console.log(message);
};

var appContentWindow = null;

var testXHRInWebviewFromBackgroundPage = function() {
  var webview = document.createElement('webview');
  webview.onconsolemessage = function(e) {
    LOG('g: ' + e.message);
    if (!appContentWindow) return;
    var logDiv = document.createElement('div');
    logDiv.innerText = e.message;
    appContentWindow.document.querySelector('#logs').appendChild(logDiv);
  };
  var loadstopFired = false;
  webview.onloadstop = function(e) {
    LOG('webview.loadstop');
    if (loadstopFired) return;
    loadstopFired = true;
    webview.executeScript({file: 'webview_xhr_script.js'},
        function(results) {
          if (results && results.length) {
            LOG('executeScript success.');
          } else {
            LOG('executeScript failure.');
          }
        });
  };
  webview.src = 'http://www.xul.fr/ajax/demos.php';
  document.body.appendChild(webview);
};

/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {width: 800, height: 600},
      function(appWindow) {
        appContentWindow = appWindow.contentWindow;
        appWindow.contentWindow.onload = function() {
          testXHRInWebviewFromBackgroundPage();
        }
      });
});
