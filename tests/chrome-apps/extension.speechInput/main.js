var LOG = function(msg) {
  var logDiv = document.getElementById('logDiv');
  if (logDiv) {
    logDiv.innerHTML += '<div>' + msg + '</div>';
  }
  window.console.log(msg);
};

window.onload = function() {
  window.console.log('onload');
  var el = document.getElementById('sbutton');
  if (!el) { window.console.log('button not found'); return; }
  el.onclick = function() { startSpeechInputTest(); };
  chrome.experimental.speechInput.onError.addListener(recognitionFailure);
  chrome.experimental.speechInput.onResult.addListener(recognitionSuccess);
};

var checkStart = function() {
  if (chrome && chrome.extension) {
    if (chrome.extension.lastError) {
      LOG('Could not start speech input: ' + chrome.extension.lastError.message);
    }
  } else {
    LOG('chrome. or chrome.extension. not defined');
  }
};

var startSpeechInputTest = function(e) {
  chrome.experimental.speechInput.start({'language': 'en'}, checkStart);
};

var recognitionSuccess = function(result) {
  LOG('recognized: ' + result.hypotheses[0].utterance + "' with confidence " + result.hypotheses[0].confidence);
};

var recognitionFailure = function(e) {
  LOG('Speech input failed: ' + e.code);
};

