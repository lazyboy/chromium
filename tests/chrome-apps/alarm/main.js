console.log('begin creating alarm');
try {
  chrome.alarms.create("", {"delayInMinutes": -19, "periodInMinutes": -6});
} catch (e) {
}
console.log('done creating alarm');
