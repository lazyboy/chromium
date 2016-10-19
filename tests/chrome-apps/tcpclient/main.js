// Copyright 2016 The Chromium Authors. All rights reserved.  Use of this
// source code is governed by a BSD-style license that can be found in the
// LICENSE file.
var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { $('logDiv').innerText += msg + '\n'; };

var connect = function() { Client.connect(); };
var disconnect = function() { Client.disconnect(); };
var send = function() { Client.send(); };
var pause = function() { Client.pause(); };
var unpause = function() { Client.unpause(); };

var init = function() {
  $('connect').onclick = connect;
  $('disconnect').onclick = disconnect;
  $('send').onclick = send;
  $('pause').onclick = disconnect;
  $('unpause').onclick = disconnect;
};

window.onload = function() {
  init();
};
