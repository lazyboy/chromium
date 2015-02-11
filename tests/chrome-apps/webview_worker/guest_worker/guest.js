var LOG = function(msg) {
  window.console.log(msg);
};

var onWorkerMsg = function(e) {
  var data = JSON.parse(e.data);
  LOG('got msg from worker: ' + e.data);
  if (data.a == 'dbg') {
    LOG('dbg: ' + data.b);
  } else if (data.a == 'status') {
    LOG('status: ' + data.b);
  }
};

var initWorker = function() {

  window.webkitStorageInfo.requestQuota(PERSISTENT, 1024 * 16,
      function(grantedB) {
        window.console.log('granted #bytes: ' + grantedB);
      },
      function(e) {
        window.console.log('grant error: ' + e.toString());
      });

  window.worker = new Worker(
      //'http://jsbin.com/vucima/1/');
      'worker.js');
  worker.addEventListener('message', onWorkerMsg);
  worker.postMessage(JSON.stringify({'a': 'request-fs'}));
};

var runStuff = function() {
  LOG('runStuff');
  initWorker();
};

window.onload = function() {
  runStuff();
};
