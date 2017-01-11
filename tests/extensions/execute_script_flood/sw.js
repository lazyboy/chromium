var backgroundJS =
  'function sendMessage() {' +
  '  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {' +
  '    lastTabId = tabs[0].id;' +
  '    chrome.tabs.sendMessage(lastTabId, "Background page started.");' +
  '  });' +
  '}' +
  'chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {' +
  '  console.log("SW handler of chrome.runtime.onMessage");' +
  '  if (msg.getCounters) {' +
  '    sendResponse({counter: -100, persistentCounter: -200});' +
  '  }' +
  '});;' +
  'chrome.browserAction.onClicked.addListener(function() {' +
  '  chrome.tabs.create({url: "http://google.com"}, function(tab) {' +
  '    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {' +
  '      sendMessage();' +
  '    });' +
  '  });' +
  '});';

self.onfetch = function(e) {
  console.log('self.onfetch [2]');
  console.log(e.request.url);
  if (/background\.js$/.test(e.request.url)) {
    console.log('responding with SW background.js');
    e.respondWith(new Response(backgroundJS));
  }
};

self.oninstall = function() {
  console.log('self.oninstall');
};

/*
console.log('registering chrome.runtime.onMessage');
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  console.log('onMessage in SW FIRE!!!');
  console.log('onMessage in SW FIRE!!!');
  console.log('onMessage in SW FIRE!!!');
});
console.log('registered chrome.runtime.onMessage');
*/
