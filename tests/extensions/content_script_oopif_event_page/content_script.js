var logDiv = null;
var LOG = function(msg) {
  if (!logDiv) {
    logDiv = document.createElement('div');
    document.body.appendChild(logDiv);
  }
  logDiv.innerText += msg + '\n';
};

chrome.runtime.onMessage.addListener(function(
    request, sender, sendResponse) {
  LOG('content_script got onMessage response');
  LOG(request.label);
});

var sendMessage = function(e) {
  chrome.runtime.sendMessage({label: 'ping from content_script.js'},
                             function(response) {
    LOG('content_script got response');
    LOG(response.label);
  });
};

console.log('window.onload');
var button = document.createElement('button');
button.onclick = sendMessage;
button.innerText = 'Send message';
document.body.appendChild(button);
