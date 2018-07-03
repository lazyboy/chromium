self.onmessage = function(e) {
  if (e.data == 'ping') {
    e.ports[0].postMessage('pong');
  } else {
    e.ports[0].postMessage('bogus');
  }
};
