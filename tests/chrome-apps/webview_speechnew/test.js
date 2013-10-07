var testSpeech = function() {
  console.log('BG.testSpeech');
  var r = new webkitSpeechRecognition();
  r.onerror = function(e) { console.log('BG.Error: ' + e.error); };
  r.onstart = function(e) { console.log('BG.Start'); };
  r.start();
};

/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  window.console.log('BG.begin');
  chrome.app.window.create('main.html', {width: 820, height: 420});
  testSpeech();
});
