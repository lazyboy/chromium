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

var changeIconWithImageData = function() {
  var img = new Image();
  img.onload = function() {
  };
};

var changeTitle = function() {
  ++counter;
  var txt = counter % 2 == 0 ? 'A' : 'B';
  chrome.browserAction.setTitle({title: txt});
};

chrome.browserAction.onClicked.addListener(function() {
  console.log('browserAction.onClicked');
  changeIcon();
});

// FIRST TRY: increase memory to 24.4mb for extension process and stays there
// after everything is complete.
/*
var interval = setInterval(changeIcon, 100);
setTimeout(function() {
  console.log('STOPPING interval');
  clearInterval(interval);
}, 10000);
*/

var secondTry = function(fun, TOTAL) {
  //var TOTAL = 1000;
  var iter = 0;
  var doStuff = function() {
    ++iter;
    if (iter > TOTAL) return;
    fun();
    setTimeout(doStuff, 100);
  };
  doStuff();
};

// SECOND TRY: Takes a long time, ups memory to 53.3mb and stays there.
secondTry(changeIcon, 100);
//secondTry(changeIcon, 10);
//secondTry(changeIcon, 200);
//secondTry(changeTitle, 1000);
