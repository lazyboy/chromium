window.console.log('guest-script-loaded');
var LOG = function(msg) {
  window.console.log('EMB: ' + msg);
};

var $ = function(id) {
  return document.getElementById(id);
};


var testSpeech = function() {
  var r = new webkitSpeechRecognition();
  r.onerror = function(e) {
    console.log('GG.Error: ' + e.error);
    $('check-guest-api-results').innerText += ' [onerror: ' + e.error + ']';
  };
  r.onstart = function(e) {
    console.log('GG.Start');
    $('check-guest-api-results').innerText += ' [onstart]';
  };
  r.onresult = function(e) {
    for (var i = 0; i < e.results.length; ++i) {
      LOG('result: ' + i + ', isFinal: ' + e.results[i].isFinal);
      var t = e.results[i][0].transcript;
      LOG('GOT: ' + e.results[i][0].transcript);
      $('check-guest-api-results').innerText += ' []' + t;
    }
  };
  r.start();
};

var setUp = function() {
  var b = document.createElement('button');
  b.innerText = 'GG.Start webkitSpeechRecognition';
  b.onclick = function() {
    window.console.log('b.onclick');
    testSpeech();
  };
  document.body.appendChild(b);

  var s = document.createElement('span');
  s.innerText = 'waiting [guest]...';
  s.id = 'check-guest-api-results';
  document.body.appendChild(s);
};

setUp();
