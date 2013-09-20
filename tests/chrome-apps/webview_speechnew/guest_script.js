window.console.log('guest-script-loaded');

var testSpeech = function() {
  var r = new webkitSpeechRecognition();
  r.onerror = function(e) { console.log('Boo.Error: ' + e.error); };
  r.onstart = function(e) { console.log('Start'); };
  r.start();
};

var setUp = function() {
  var b = document.createElement('button');
  b.innerText = 'Start webkitSpeechRecognition';
  b.onclick = function() {
    window.console.log('b.onclick');
    testSpeech();
  };
  document.body.appendChild(b);
};

setUp();
