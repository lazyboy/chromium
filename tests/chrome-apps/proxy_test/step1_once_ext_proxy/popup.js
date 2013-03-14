// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Modified from chrome-apps-sample.
document.addEventListener('DOMContentLoaded', function () {
  LOG('popup.js DOMContentLoaded');

  $('set-fixed-proxy').onclick = function(e) {
    LOG('set-fixed-proxy clicked');
    setProxy();
    LOG('Done set-fixed-proxy');
  };

  $('clear-fixed-proxy').onclick = function(e) {
    LOG('clear-fixed-proxy clicked');
    clearProxy();
    LOG('Done clear-fixed-proxy');
  };
});

