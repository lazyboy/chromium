chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('event page got message');
  console.log(request.label);
  sendResponse({label: 'pong'});
  window.setTimeout(function() {
    console.log('send using chrome.tabs');
    chrome.tabs.query({
      'active': true,
      'currentWindow': true
    }, function(tabs) {
      chrome.tabs.sendMessage(
          tabs[0].id, {label: 'pong2'});
    });
  }, 1000);
});
