var LOG = function(msg) {
  window.console.log(msg);
  $('value').innerText += 'log: ' + msg + '\n';
};
var $ = function(id) { return document.getElementById(id); };
var clearLogs = function() { $('value').innerText = '' };


var DBNAME = 'dbname';
var TABLE = 'mytable';
var COLUMN = 'valcol';

var g_db;
var attemptedToOpen = false;

var getData = function(numChars) {
  var y = []; y.length = numChars + 1;
  return y.join('a');
};

var maybeOpenDb = function() {
  if (!attemptedToOpen) {
    attemptedToOpen = 1;
    openOrCreateDb();
  }
};

var readValue = function() {
  LOG('readValue');
  maybeOpenDb();
  if (!g_db) { LOG('Error, no db'); return; }
  g_db.transaction(
      function callback(trans) {
        trans.executeSql(
            'SELECT * FROM ' + TABLE, [],
            function callback(transI, resultSet) {
              LOG('Read: rows.length: ' + resultSet.rows.length);
            }, function errorCallbackTransaction(transI, sqlError) {
              var msg = sqlError ? sqlError.message : 'UW';
              LOG('Error, read.executeSql failed: ' + msg);
            });
      }, function errorCallback(sqlError) {
        var msg = sqlError ? sqlError.message : 'UW';
        LOG('Error, read transaction failed: ' + msg);
      });
};

var writeValue = function() {
  LOG('writeValue');
  maybeOpenDb();
  if (!g_db) { LOG('Error, no db'); return; }
  var numchars = 1 * $('inumchars').value;
  LOG('numchars: ' + numchars);
  if (typeof numchars != 'number') {
    LOG('Error: numchars not a number');
    return;
  }

  var val = getData(numchars);
  g_db.transaction(
      function callback(trans) {
        trans.executeSql(
            'INSERT INTO ' + TABLE + ' VALUES(?)', [val],
            function callback(transI, resultSet) {
              LOG('Write success');
            }, function errorCallback(transI, sqlError) {
              var msg = sqlError ? sqlError.message : 'UW';
              LOG('Error, write.executeSql failed');
            });
      }, function errorCallback(sqlError) {
        var msg = sqlError ? sqlError.message : 'UW';
        LOG('Error, write transaction failed: ' + msg);
      });
};

var clearValues = function() {
  LOG('clearValues');
  maybeOpenDb();
  if (!g_db) { LOG('Error, no db'); return; }
  g_db.transaction(
      function callback(trans) {
        trans.executeSql('DELETE FROM ' + TABLE, []);
      }, function errorCallback(sqlError) {
        var msg = sqlError ? sqlError.message : 'UW';
        LOG('Error, delete transaction failed: ' + msg);
      });
};

var openOrCreateDb = function() {
  LOG('Start open/create db');
  g_db = window.openDatabase(DBNAME, '', 'Deskription', 5 * 1024 * 1024, function(db) {
    // creation callback.
    LOG('Database created');
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE ' + TABLE + '(' + COLUMN + ' TEXT);',
                    [],
                    function successCallback(tx, rs) {
                      LOG('CREATE TABLE success');
                    },
                    function failureCallback(tx, err) {
                      LOG('CREATE TABLE failure: ' + err.message);
                    });
    });
  });
  if (!g_db) { LOG('db return NULL'); return; }
  LOG('End open/create db');
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
  $('createb').onclick = openOrCreateDb;
  $('readb').onclick = readValue;
  $('writeb').onclick = writeValue;
  $('clearb').onclick = clearValues;
  $('showb').onclick = showDbUsageStat;

  $('clearlogs').onclick = clearLogs;
};

