// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var LOG = function(message) {
  window.console.log(message);
};

window.onload = function() {
  window.console.log('App window.onload');
  var webview = document.createElement('webview');
  webview.onconsolemessage = function(e) {
    LOG('g: ' + e.message);
    var logDiv = document.createElement('div');
    logDiv.innerText = e.message;
    document.querySelector('#logs').appendChild(logDiv);
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
  document.querySelector('#container').appendChild(webview);
};
