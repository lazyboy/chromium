var Client = {};

function ClientInstance(address, port) {
  this.address_ = address;
  this.port_ = port;
  this.tcpSocketId_ = -1;
  this.paused_ = false;
};

ClientInstance.prototype.connect = function() {
  chrome.sockets.tcp.create({
    "name": "test",
    "persistent": true,
    "bufferSize": 128
  }, this.onCreate_.bind(this));
};

ClientInstance.prototype.onCreate_ = function(socketInfo) {
  this.tcpSocketId_ = socketInfo.socketId;
  LOG('got socketId: ' + this.tcpSocketId_);
  chrome.sockets.tcp.getInfo(this.tcpSocketId_, this.onGetInfo_.bind(this));
};

ClientInstance.prototype.onGetInfo_ = function(result) {
  LOG('Connecting...');
  chrome.sockets.tcp.connect(this.tcpSocketId_,
      this.address_, this.port_, this.onConnect_.bind(this));
};

ClientInstance.prototype.onConnect_ = function(result) {
  LOG('onConnect_');
  // Setup the global listeners.
  chrome.sockets.tcp.onReceive.addListener(this.receive_.bind(this));
  chrome.sockets.tcp.onReceiveError.addListener(this.receiveError_.bind(this));
};

function arrayBuffer2String_(buf, callback) {
  var blob = new Blob([new Uint8Array(buf)]);
  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result);
  };
  f.readAsText(blob);
}

ClientInstance.string2ArrayBuffer_ = function(string, callback) {
  var blob = new Blob([string]);
  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result);
  };
  f.readAsArrayBuffer(blob);
}

ClientInstance.prototype.receive_ = function(receiveInfo) {
  LOG('Client.receive_');
  arrayBuffer2String_(receiveInfo.data, function(s) {
    dataAsString = s;  // save this for error reporting
    LOG(dataAsString);
  });
};

ClientInstance.prototype.receiveError_ = function(receiveErrorInfo) {
  LOG('Client.receiveError_');
  LOG(receiveErrorInfo);
};

ClientInstance.prototype.pause = function(value) {
  if (this.paused_ == value) {
    LOG('pause state already: ' + this.paused_);
    return;
  }
  this.paused_ = value;
  chrome.sockets.tcp.setPaused(this.tcpSocketId_, value,
      this.onPause_.bind(this));
};

ClientInstance.prototype.onPause_ = function() {
  LOG('onPause_');
};

ClientInstance.prototype.send = function() {
  var requestData = '0100000005320000005hello';
  ClientInstance.string2ArrayBuffer_(requestData, function(arrayBuffer) {
    chrome.sockets.tcp.send(this.tcpSocketId_,
                            arrayBuffer,
                            this.onSend_.bind(this));
  }.bind(this));
};

ClientInstance.prototype.onSend_ = function(sendInfo) {
  LOG('onSend_');
};

ClientInstance.prototype.disconnect = function(callback) {
  chrome.sockets.tcp.close(this.tcpSocketId_, function() {
    LOG('Socket disconnected');
    callback();
  });
};

ClientInstance.prototype.destroy = function() {
  chrome.sockets.tcp.onReceive.removeListener(this.receive_.bind(this));
  chrome.sockets.tcp.onReceiveError.removeListener(this.receiveError_.bind(this));
};


Client.instance_ = null;

Client.connect = function() {
  if (Client.instance_ != null) {
    LOG('Error in Client.connect, already connected');
    return;
  }
  // Parse address info:
  var address = $('address').value;
  var port = 1 * $('port').value;

  Client.instance_ = new ClientInstance(address, port);
  Client.instance_.connect();
};

Client.checkThenDo_ = function(name, action) {
  if (!Client.instance_) {
    LOG('No instance found to ' + name);
    return;
  }
  action();
};

Client.disconnect = function() {
  Client.checkThenDo_('disconnect', function() {
    Client.instance_.destroy();
    Client.instance_ = null;
  });
};

Client.pause = function() {
  Client.checkThenDo_('pause', function() { Client.instance_.pause(true); });
};

Client.unpause = function() {
  Client.checkThenDo_('unpause', function() { Client.instance_.unpause(true); });
};

Client.send = function() {
  Client.checkThenDo_('send', function() { Client.instance_.send(); });
};
