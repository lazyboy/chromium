console.log('begin creating alarm');

function createAlarm() {
  try {
    //chrome.alarms.create("", {"delayInMinutes": 1, "periodInMinutes": -6});
    // FAIL.
    //chrome.alarms.create("", {"when": Date.now(), "periodInMinutes": 0});  //
    var max = Number.MAX_VALUE - 10.0;
    //chrome.alarms.create("", {when: Date.now()-10.0, "periodInMinutes": -2});
    chrome.alarms.create("", {when: Date.now()-10.0, "periodInMinutes": 0.0167});
  } catch (e) {
  }
}

createAlarm();
console.log('end creating alarm');
