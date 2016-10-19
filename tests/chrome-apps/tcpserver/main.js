var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) {
  $('logDiv').innerText += msg + '\n';
};

var startServer = function() {
  var serverAddress = $('address').value;
  var serverPort = $('port').value;
  Server.startServer(serverAddress, serverPort);
};

var stopServer = function() {
  Server.stopServer();
};

var init = function() {
  $('start').onclick = startServer;
  $('stop').onclick = stopServer;
};

window.onload = function() {
  init();
};
