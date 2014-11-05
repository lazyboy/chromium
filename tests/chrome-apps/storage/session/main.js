var LOG = function(msg) { window.console.log(msg); };
var $ = function(id) { return document.getElementById(id); };

var KEY = 'foo';
var SS = window.sessionStorage;

var printf = function(msg) {
  $('status').innerText += '\n' + msg;
};

var read = function(key) {
  var gotItem = SS.getItem(key);
  printf('read: [' + gotItem + ']');
};

var write = function(key) {
  var d = new Date();
  var str = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
  printf('will write: [' + str + ']');
  SS.setItem(key, str);
  printf('wrote: [' + str + ']');
};

window.onload = function() {
  var ss = window.sessionStorage;
  $('status').innerText += ss + ' -- end';

  read(KEY);
  write(KEY);
  read(KEY);
};

