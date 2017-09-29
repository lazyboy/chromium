console.log('Hello from background.js');
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('onCreated');
  console.log('url: ' + tab.url);
});
