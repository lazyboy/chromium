// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var counter = 0;
var changeIcon = function() {
  ++counter;
  var imgName = counter % 2 == 0 ? 'en.png' : 'dis.png';
  chrome.browserAction.setIcon({path: {38: 'icons/' + imgName}}, function() {
    console.log('callback fired');
  });
};

chrome.browserAction.onClicked.addListener(function() {
  console.log('browserAction.onClicked');
  changeIcon();
});

var test = function(fun, TOTAL, TIMEOUT) {
  var iter = 0;
  var doStuff = function() {
    ++iter;
    if (iter > TOTAL) return;
    fun();
    setTimeout(doStuff, TIMEOUT);
  };
  doStuff();
};

// Extension process takes up memory up to 53.3mb and stays there.
test(changeIcon, 1000, 10);
