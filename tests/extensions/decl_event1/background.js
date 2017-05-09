// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global variables only exist for the life of the page, so they get reset
// each time the page is unloaded.
var counter = 1;

console.log("Loaded.");

chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed.");

  // Register a webRequest rule to redirect bing to google.
  var wr = chrome.declarativeWebRequest;
  chrome.declarativeWebRequest.onRequest.addRules([{
    id: "0",
    conditions: [new wr.RequestMatcher({url: {hostSuffix: "bing.com"}})],
    actions: [new wr.RedirectRequest({redirectUrl: "http://google.com"})]
  }]);
});

chrome.bookmarks.onRemoved.addListener(function(id, info) {
  alert("I never liked that site anyway.");
});

chrome.browserAction.onClicked.addListener(function() {
  // The event page will unload after handling this event (assuming nothing
  // else is keeping it awake). The content script will become the main way to
  // interact with us.
  chrome.tabs.create({url: "http://google.com"}, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
      console.log('execute script succeeded.');
    });
  });
});
