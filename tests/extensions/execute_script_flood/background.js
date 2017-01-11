// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.browserAction.setBadgeText({text: "ON"});
console.log("Loaded.");

chrome.browserAction.onClicked.addListener(function() {
  console.log('Start');
  // File version
  for (var i = 0; i < 1000; ++i) {
    chrome.tabs.executeScript(undefined, {file: "content.js"}, function() {});
  }
  /*
  for (var i = 0; i < 1000; ++i) {
    var str = 'foo ' + i;
    chrome.tabs.executeScript(undefined, {code: "dummy = '" + str + "';" }, function() {});
  }
  */
  console.log('Finish');
});
