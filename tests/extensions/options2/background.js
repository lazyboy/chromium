// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global variables only exist for the life of the page, so they get reset
// each time the page is unloaded.

var lastTabId = -1;
function sendMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.tabs.sendMessage(lastTabId, "Background page started.");
  });
}

sendMessage();
chrome.browserAction.setBadgeText({text: "ON"});
console.log("Loaded.");

chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed.");
});

chrome.browserAction.onClicked.addListener(function() {
  // The event page will unload after handling this event (assuming nothing
  // else is keeping it awake). The content script will become the main way to
  // interact with us.
  chrome.tabs.create({url: "http://google.com"}, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
      // Note: we also sent a message above, upon loading the event page,
      // but the content script will not be loaded at that point, so we send
      // another here.
      sendMessage();
    });
  });
});

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
});

chrome.runtime.onSuspend.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // After the unload event listener runs, the page will unload, so any
    // asynchronous callbacks will not fire.
    //alert("This does not show up.");
  });
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({text: ""});
  chrome.tabs.sendMessage(lastTabId, "Background page unloaded.");
});
