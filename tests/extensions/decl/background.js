var show = new chrome.declarativeContent.ShowPageAction();
var staticCondition = new chrome.declarativeContent.PageStateMatcher({
  pageUrl: {
    hostEquals: '127.0.0.3'
  }
});

var match_rules = [
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: '127.0.0.3'
        }
      })
    ],
    actions: [ show]
  },
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: '127.0.0.3'
        }
      })
    ],
    actions: [ show]
  }/*,
  {
    conditions: [ staticCondition, staticCondition ],
    actions: [show]
  }*/
];

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    console.log('BEG addRules');
    chrome.declarativeContent.onPageChanged.addRules(match_rules);
    console.log('END addRules');
  });
});


