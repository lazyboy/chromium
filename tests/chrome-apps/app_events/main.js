var LOG = function(msg) {
  window.console.log(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

window.onload = function() {
  $('register').onclick = function(e) {
    LOG('chrome alarms register');
    chrome.alarms.clearAll(function() {
      LOG('cleared all');
      chrome.alarms.create('my-alarm', {delayInMinutes: 0.3});
    });
  };
};

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log('*** chrome.alarms.onAlarm ***');
  console.log(JSON.stringify(alarm));
});
