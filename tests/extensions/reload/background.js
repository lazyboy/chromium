// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  /*
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  */

  window.console.log('browserAction.onClick');
  chrome.tabs.query({}, function(tabs) {
    window.console.log('chrome.tabs.query');
    for (var i = 0 ; i < tabs.length; ++i) {
      if (tabs[i].active) {
        window.console.log('tab, id: ' + tabs[i].id);
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });
});
