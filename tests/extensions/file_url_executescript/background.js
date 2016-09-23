// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var testFunc = function() {
  window.console.log('testFunc');
};

  window.console.log('before append');
  var d = document.createElement('div');
  d.style['font-size'] = '22px';
  d.innerText = 'Hello world';
  document.body.appendChild(d);
  window.console.log('after append');

  chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
  });


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
  });
});
