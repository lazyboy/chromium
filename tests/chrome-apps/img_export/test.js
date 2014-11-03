/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html',
    {width: 500, height: 300});
});

var log = function(msg) {
  window.console.log(msg);
};

// Background page reads |inFileName| and sends the output to app.
var inFileName = 'input.png';

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.type == 'request-file') {
    log('request-file');
    // Fetch file.
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function(e) {
      if (xhr.readyState == 4) {
        log('xhr.readyState == 4');

        // send the data back to app.
        chrome.runtime.sendMessage({
          type: 'request-file-response',
          data: Array.apply(null, new Uint8Array(xhr.response)),
        });
      }
    });
    xhr.open('GET', inFileName, true);
    xhr.responseType = 'arraybuffer';
    xhr.send();
  }
});
