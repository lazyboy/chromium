// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SAMPLE_URL =
  'http://techslides.com/demos/sample-videos/small.webm';
var SAMPLE_FILENAME = 'small.webm';

function ChromeApp() {
}

ChromeApp.prototype.start = function() {
  this.fetchVideo().then(function(videoBlobResponse) {
    window.console.log('fetchVideo succeeded!');
    var webview = document.querySelector('webview');
    webview.onconsolemessage = function(e) {
      window.console.log('G: ' + e.message);
    };
    webview.onloadstop = function() {
      webview.executeScript({
        file: 'webview_script.js',
      }, function(results) {
        if (!results || !results.length) {
          window.console.log('webview.executeScript failure.');
          return;
        }
        window.console.log('webview.executeScript success.');
        webview.contentWindow.postMessage(videoBlobResponse, '*');
      });
    };
    webview.src = 'about:blank';
  }).catch(function() {
    window.console.log('fetchVideo failed');
  });
};

ChromeApp.prototype.fetchVideo = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.retrieveWebmViaFileSystem_().then(function(blobResponse) {
      window.console.log('Retrieve via local file succeeded.');
      resolve(blobResponse);
    }).catch(function(rejectStatus) {
      window.console.log('XHR[1] fail: ' + rejectStatus.statusText);
      self.retrieveWebmViaHTTP_().then(function(blobResponse) {
        window.console.log('XHR[2] succeeded.');
        resolve(blobResponse);
      }).catch(function(rejectStatus) {
        reject(rejectStatus);
      });
    });
  });
};

ChromeApp.prototype.retrieveWebmViaFileSystem_ = function() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';

    xhr.open('GET', SAMPLE_FILENAME);
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject({status: this.status, statusText: xhr.statusText});
    };
    xhr.send();
  });
};


ChromeApp.prototype.retrieveWebmViaHTTP_ = function() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';

    xhr.open('GET', SAMPLE_URL);
    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.send();
  });
};

window.onload = function() {
  window.console.log('Chrome app window.onload');
  window.app = new ChromeApp();
  window.app.start();
};

