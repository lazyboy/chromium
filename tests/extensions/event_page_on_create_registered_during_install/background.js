chrome.runtime.onInstalled.addListener(function() {
  console.log('**** onInstalled ****');
  chrome.tabs.onCreated.addListener(function() {
    console.log('hello onCreate');
  });
});
