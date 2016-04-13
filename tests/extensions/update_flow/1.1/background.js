console.log('Hello from version 1.1');

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('Extension v1.1 got onInstalled event.');
  console.log('previousVersion: ' + details.previousVersion);
});

chrome.runtime.onUpdateAvailable.addListener(function(details) {
  console.log('Extension v1.1 got onUpdateAvailable event.');
});
