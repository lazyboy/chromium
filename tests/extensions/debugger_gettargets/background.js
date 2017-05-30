chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('chrome.browserAction.onClicked');
  chrome.debugger.getTargets(function(result) {
    console.log('chrome.debugger.getTargets');
    console.log(result);
    if (result) {
      for (var i = 0; i < result.length; ++i) {
        //console.log(JSON.stringify(result[i]));
        var type = result[i].type;
        var url = result[i].url;
        console.log('TYPE: ' + type + ', url = ' + url);
      }
    }
  });
});
