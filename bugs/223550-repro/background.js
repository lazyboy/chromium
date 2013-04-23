chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading' && tab.url.indexOf("http://www.google") == 0) {
		console.log("execute");
	}
});
