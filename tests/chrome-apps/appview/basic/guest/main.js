
function onLaunch(args, opt_appWindowCreationCallback) {
    var innerBounds = { width: 400, height: 400 };
    var options = {
      innerBounds: innerBounds,
    };

    chrome.app.window.create("index.html", options, function(w) {
    });
}

chrome.app.runtime.onLaunched.addListener(onLaunch);

chrome.app.runtime.onEmbedRequested.addListener(function(request) {
  request.allow('index.html');
});
