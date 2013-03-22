var LOG = function(msg) {
  window.console.log(msg);
  $('value').innerText += 'log: ' + msg + '\n';
};
var $ = function(id) { return document.getElementById(id); };
var clearLogs = function() { $('value').innerText = '' };


var DBNAME = 'dbname';
var TABLE = 'mytable';
var COLUMN = 'valcol';

var dbErrorGFunction = function(e) { LOG('dbErrorGFunction: ' + e); };

var setUpDone = false;
var maybeSetUpIndexedDB = function() {
  if (setUpDone) return;
  window.indexedDB = window.indexedDB ||
                     window.webkitIndexedDB ||
                     window.mozIndexedDB;
  if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction;
    window.IDBKeyRange = window.webkitIDBKeyRange;
  }
};
maybeSetUpIndexedDB();

var g_db;
var attemptedToOpen = false;

var getData = function(numChars) {
  var y = []; y.length = numChars + 1;
  return y.join('a');
};

var openOrCreateDb = function(onSuccess) {
  LOG('Start open/create db');
  var version = 1;
  var req = indexedDB.open(TABLE, version);

  req.onupgradeneeded = function(e) {
    var db = e.target.result;
    e.target.transaction.onerror = dbErrorGFunction;
    if (db.objectStoreNames.contains(TABLE)) {
      db.deleteObjectStore(TABLE);
    }
    var store = db.createObjectStore(TABLE);
  };
  req.onsuccess = function(e) {
    LOG('openOrCreateDb.req.onsuccess: e.target.result: ' + e.target.result);
    g_db = e.target.result;
    if (onSuccess) onSuccess(true /* opt_doNotOpen */);
  };
  req.onerror = dbErrorGFunction;
};

var maybeOpenDb = function(continueFunc) {
  if (!attemptedToOpen) {
    attemptedToOpen = 1;
    var successCallback = continueFunc;
    openOrCreateDb(successCallback);
  }
};

var writeValue = function(opt_doNotOpen) {
  LOG('writeValue');
  if (!opt_doNotOpen) { return guardedOpen(writeValue); }
  if (!g_db) { LOG('Error, no db'); return; }

  var numchars = 1 * $('inumchars').value;
  LOG('numchars: ' + numchars);
  if (typeof numchars != 'number') {
    LOG('Error: numchars not a number');
    return;
  }

  var val = getData(numchars);

  var trans = g_db.transaction([TABLE], 'readwrite');
  var store = trans.objectStore(TABLE);

  //var req = store.put(val, '' + (+new Date));
  var req = store.put(val, 'single');
  //var req = store.put('dinosaur', 'single');
  req.onsuccess = function(e) {
    LOG('writeValue.req.onsuccess');
  };
  req.onerror = function(e) {
    LOG('writeValue.req.onerror: ' + req.error);
    LOG('name: ' + req.error.name);
  };
};

var guardedOpen = function(callbackFunc) {
  if (g_db) { // Already opened successfully.
    callbackFunc(true /* opt_doNotOpen */);
  } else {
    maybeOpenDb(callbackFunc);
  }
};

var readCount = function(opt_doNotOpen) {
  LOG('readCount');
  if (!opt_doNotOpen) { return guardedOpen(readCount); }
  if (!g_db) { LOG('Error, no db'); return; }

  var trans = g_db.transaction([TABLE], 'readwrite');
  var store = trans.objectStore(TABLE);

  var req = store.count();
  req.onsuccess = function(e) {
    var count = e.target.result;
    LOG('readCount.req.onsuccess, count: ' + count);
  };
  req.onerror = function(e) {
    LOG('readCount.req.onerror');
  }
};

var readValue = function(opt_doNotOpen) {
  LOG('readValue');
  if (!opt_doNotOpen) { return guardedOpen(readValue); }
  if (!g_db) { LOG('Error, no db'); return; }

  var trans = g_db.transaction([TABLE], 'readwrite');
  var store = trans.objectStore(TABLE);

  var req = store.get('single');
  req.onsuccess = function(e) {
    var value = e.target.result;
    LOG('readValue.req.onsuccess, value: ' + value);
  };
  req.onerror = function(e) {
    LOG('readValue.req.onerror');
  }

  /*
  var singleRange = IDBKeyRange.only('single');
  //var singleRange = IDBKeyRange.lowerBound(0);
  var cursorReq = store.openCursor(singleRange);
  cursorReq.onsuccess = function(e) {
    var cursor = e.target.result;
    if (cursor) {
      //LOG('readValue.cursor: ' + cursor);
      LOG('readValue.cursor.value: ' + cursor.value);
      cursor.continue();
    }
  };
  cursorReq.onerror = function(e) { LOG('readValue.req.onerror'); };
  */
};

var clearValues = function(opt_doNotOpen) {
  LOG('clearValues');
  if (!opt_doNotOpen) { return guardedOpen(clearValues); }
  if (!g_db) { LOG('Error, no db'); return; }

  var trans = g_db.transaction([TABLE], 'readwrite');
  var store = trans.objectStore(TABLE);

  var req = store.clear();
  req.onsuccess = function(e) {
    LOG('clearValues.req.onsuccess');
  };
  req.onerror = function(e) {
    LOG('clearValues.req.onerror');
  };
};

var showDbUsageStat = function() {
  LOG('showDbUsageStat');
  navigator.webkitTemporaryStorage.queryUsageAndQuota(
      function(currentUsageInBytes, currentQuotaInBytes) {
        LOG('webkitTemporaryStorage: currentUsageInBytes: ' +
            currentUsageInBytes +
            ', currentQuotaInBytes: ' + currentQuotaInBytes);
      });
  navigator.webkitPersistentStorage.queryUsageAndQuota(
      function(currentUsageInBytes, currentQuotaInBytes) {
        LOG('webkitPersistentStorage: currentUsageInBytes: ' +
            currentUsageInBytes +
            ', currentQuotaInBytes: ' + currentQuotaInBytes);
      });
};

window.onload = function() {
  $('createb').onclick = function(e) { openOrCreateDb(); };
  $('countb').onclick = function(e) { readCount(); };
  $('readb').onclick = function(e) { readValue(); };
  $('writeb').onclick = function(e) { writeValue(); };
  $('clearb').onclick = function(e) { clearValues(); };

  $('showb').onclick = showDbUsageStat;
  $('clearlogs').onclick = clearLogs;
};

