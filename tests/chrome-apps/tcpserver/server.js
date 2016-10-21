var Server = {};

Server.tcpServer_ = null;

Server.startServer = function(address, port) {
  if (Server.tcpServer_ != null) {
    LOG('Server already running, stop first before restarting.');
    return;
  }
  Server.tcpServer_ = new TcpServer(address, 1 * port);
  Server.tcpServer_.listen(Server.acceptCallback_);
};

Server.stopServer = function() {
  console.log('Server.startServer');
  if (!Server.tcpServer_) return;
  console.log('disconnect Server');
  Server.tcpServer_.disconnect();
  Server.tcpServer_ = null;
};

Server.acceptCallback_ = function(tcpConnection, socketInfo) {
  var info="["+socketInfo.peerAddress+":"+socketInfo.peerPort+"] Connection accepted!";
  LOG(info);
  console.log(socketInfo);
  console.log(info);
  tcpConnection.addDataReceivedListener(function(data) {
    LOG('Server received data');
    var lines = data.split(/[\n\r]+/);
    for (var i=0; i<lines.length; i++) {
      var line=lines[i];
      if (line.length>0) {
        var info="["+socketInfo.peerAddress+":"+socketInfo.peerPort+"] "+line;
        //log.output(info);
        console.log(info);

        setTimeout(function() {
          // Echo.
          console.log('Sending echo');
          try {
            tcpConnection.sendMessage(info);
          } catch (ex) {
            tcpConnection.sendMessage(ex);
          }
        }, 10000);
      }
    }
  });
};
