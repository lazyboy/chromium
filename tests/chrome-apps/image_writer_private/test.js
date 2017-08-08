chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {width: 500, height: 300});
});
