// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.body.innerHTML = "";

function addButton(name, cb) {
  var a = document.createElement("button");
  a.innerText = name;
  a.onclick = cb;
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(a);
}

function log(str) {
  console.log(str);
  logDiv.innerHTML += str + "<br>";
}

addButton("Nothing button", function() {
  chrome.runtime.sendMessage({registerSW: true});
  log('I do not do anything');
});

var logDiv = document.createElement("div");
logDiv.style.border = "1px dashed black";
document.body.appendChild(document.createElement("br"));
document.body.appendChild(logDiv);

log("Ready.");
