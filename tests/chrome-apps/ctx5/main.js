var APP_ITEMS = false;

var LOG = function(msg) {
  window.console.log(msg);
  showLogInDiv(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
  return "http://jsbin.com/bisen/1/";
  //return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest <input type=\"text\" value=\"my value\"/></body>";
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

  w.addEventListener('contextmenu', function(e) {
    LOG('**** contextmenu ****');
    LOG('**** contextmenu ****');
    LOG('**** contextmenu ****');
    LOG('* e.items: ' + e.items);
    var len = e.items.length;
    var itemIdsToShow = [];
    for (var i = 0; i < len; ++i) {
      LOG('item ' + i);
      LOG('commandId: ' + e.items[i].commandId);
      LOG('label: ' + e.items[i].label);
      if (len > 1 && i == 1) {
        continue;
      }

      var itemToShow = {'commandId': e.items[i].commandId};
      if (i%2) itemToShow.label = 'Foobar ' + i;
      itemIdsToShow.push(itemToShow);

      //itemIdsToShow.push(e.items[i].commandId);
      //itemIdsToShow.push({'commandId': e.items[i].command_Id, 'label': 'Foobar' + i});
      //itemIdsToShow.push(e.items[i]);
    }

    //e.menu.show();
    e.preventDefault();
    window.setTimeout(function() {
      LOG('setTimeout fire to show, calling allow()');
      // Move inspect element to the top.
      if (itemIdsToShow.length > 1) {
        var tmp = itemIdsToShow[0];
        itemIdsToShow[0] = itemIdsToShow[itemIdsToShow.length - 1];
        itemIdsToShow[itemIdsToShow.length - 1] = tmp;
      }
      // Add separator between each and every item.
      var outItems = [];
      for (i = 0; i < itemIdsToShow.length; ++i) {
        var item = itemIdsToShow[i];
        outItems.push(item);
        if (item.commandId != -1 && i != itemIdsToShow.length - 1 && itemIdsToShow[i + 1].commandId != -1) {
          outItems.push({commandId: -1});  // Separator.
        }
      }

      e.menu.show(outItems);
      LOG('done calling allow()');
    //}, 3000);
    }, 30);
  });

  w.src = src;
  document.querySelector('#container').appendChild(w);
};
