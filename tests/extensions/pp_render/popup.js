// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
/*
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
*/
  var resp = window.confirm('are you sure');
  alert('resp: ' + resp);
  //window.console.log('response: ' + resp);
  //e.preventDefault();
  //e.stopPropagation();
  //alert('resp: ' + resp);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('clickme').addEventListener('click', click);
/*
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
*/
});
