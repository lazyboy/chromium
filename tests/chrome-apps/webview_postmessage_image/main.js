(function() {
  window.onload = function() {
    var wv = document.createElement("webview");

    wv.partition="persist:trusted";
    wv.src="about:blank";

    wv.addEventListener('contentload', function() {
      injectListeningScript(wv)
      .then(retrieveLocalFileBlob)
      .then(function(resp) {
        sendBlobViaPostMessage(resp, wv);
      });
    });

    wv.addEventListener("consolemessage", function(e) {
      console.log("Webview console: " + e.message);
    });

    document.body.appendChild(wv);
  };

  function errH(e) {"Error handler: " + console.log(e.message);}

  function injectListeningScript(wv) {
    return new Promise(function(resolve, reject) {
      wv.executeScript({file: "wv.js"}, function() {
        resolve();
      });
    });
  }

  function retrieveLocalFileBlob() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";

      xhr.open("GET", "input.png");
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.send();
    });
  }

  function sendBlobViaPostMessage(blob, wv) {
    return new Promise(function(resolve, reject) {
        console.log("Posting " + blob.size + " bytes");
        wv.contentWindow.postMessage(blob, "*");
        resolve();
    });
  }
}());
