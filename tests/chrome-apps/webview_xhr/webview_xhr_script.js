// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var onResponse = function(response) {
  window.console.log('****** XHR RESPONSE RECEIVED *****!');
  window.console.log('data: ' + response);
};

var testXHR = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'ajax-get.txt', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      onResponse(xhr.responseText);
    } 
  }; 
  xhr.send(null); 
};

testXHR();
