// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  }, function(results) {
    if (chrome.runtime.lastError) {
      console.log('there was chrome.runtime.lastError');
      console.log(chrome.runtime.lastError.message);
      return;
    }
    console.log('succesfully injected script');
  });
});
