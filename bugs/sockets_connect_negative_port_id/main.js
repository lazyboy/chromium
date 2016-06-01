var $ = function(id) {
  return document.getElementById(id);
};

window.onload = function() {
  var testSocketButton = $('test-socket');
  testSocketButton.onclick = function(e) {
    chrome.socket.connect(
        10,
        "dummy_host_string",
        -1234,
        function nullFunction() {});
  };
};
