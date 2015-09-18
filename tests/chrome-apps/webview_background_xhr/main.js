// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var LOG = function(message) {
  window.console.log(message);
};

window.LOG_WV = function(message) {
  LOG('g: ' + e.message);
  var logDiv = document.createElement('div');
  logDiv.innerText = e.message;
  document.querySelector('#logs').appendChild(logDiv);
};

window.addEventListener('load', function() {
  window.console.log('App window.onload');
  webview.onconsolemessage = function(e) {
});
