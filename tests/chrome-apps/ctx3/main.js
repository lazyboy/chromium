var APP_ITEMS = false;

var LOG = function(msg) {
  window.console.log(msg);
  showLogInDiv(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
  return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest <input type=\"text\" value=\"my value\"/></body>";
};

var showLogInDiv = function(msg) {
  document.querySelector('#log').innerText += msg + '\n';
};

window.onload = function() {
  var src = getWebViewSrc();

  var w = document.createElement('webview');
  w.id = 'webview1';

  w.addEventListener('loadstop', function(e) {
    LOG('webview1.loadstop');
  });

  w.addEventListener('systemContextMenu', function(e) {
    LOG('**** systemContextMenu ****');
    LOG('**** systemContextMenu ****');
    LOG('**** systemContextMenu ****');
    LOG('* e.items: ' + e.items);
    var len = e.items.length;
    var itemIdsToShow = [];
    for (var i = 0; i < len; ++i) {
      LOG('item ' + i);
      LOG('command_id: ' + e.items[i].command_id);
      LOG('title: ' + e.items[i].title);
      if (len > 1 && i == 1) {
        continue;
      }
      //itemIdsToShow.push(e.items[i].command_id);
      itemIdsToShow.push({'command_id': e.items[i].command_id, 'title': 'Foobar' + i});
      //itemIdsToShow.push(e.items[i]);
    }

    e.preventDefault();
    window.setTimeout(function() {
      LOG('setTimeout fire to show, calling allow()');
      e.request.allow(itemIdsToShow);
      LOG('done calling allow()');
    //}, 3000);
    }, 30);
  });

  w.src = src;
  document.querySelector('#container').appendChild(w);
};
