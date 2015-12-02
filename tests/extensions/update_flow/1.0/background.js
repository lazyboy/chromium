console.log('Hello from version 1.0');

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('Extension v1.0 got onInstalled event.');
});

chrome.runtime.onUpdateAvailable.addListener(function(details) {
  console.log('Extension v1.0 got onUpdateAvailable event.');
});
