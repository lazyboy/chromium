// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var $ = function(id) { return document.getElementById(id); };

window.addEventListener('message', function(e) {
  console.log('Webview received ' + e.data.size + ' bytes');
  setupVideoPlayer(e.data);
});

var setupVideoPlayer = function(videoSrc) {
  var div = document.createElement('div');
  div.innerHTML = '<div>' +
    '  <button id="play-button">Play</button>' +
    '  <button id="pause-button">Pause</button>' +
    '</div>' +
    '<div>' +
    '<video id="my-video"></video>'+
    '</div>'
  document.body.appendChild(div);

  var videoElement = $('my-video');
  videoElement.src = URL.createObjectURL(videoSrc);

  var playButton = $('play-button');
  playButton.onclick = function() {
    videoElement.play();
  };
  var pauseButton = $('pause-button');
  pauseButton.onclick = function() {
    videoElement.pause();
  };
};
