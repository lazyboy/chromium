console.log('begin creating alarm');

function createAlarm() {
  try {
    chrome.alarms.create("", {"delayInMinutes": -19, "periodInMinutes": -6});
  } catch (e) {
  }
}

createAlarm();
console.log('end creating alarm');
