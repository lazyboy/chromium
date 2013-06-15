var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

var makeContent = function() {
  var ret = '';
  for (var s = 0; s < 30; ++s) ret += '<div>' + s + '</div>';
  return ret;
};

window.onload = function() {
  var y = makeContent();
  var ihtml = '<webview src="data:text/html,<body bgcolor=red>Guest' + y + '</body>" style="height: 100px;"></webview>';
  $('webview-container').innerHTML = ihtml;

  // <object>
  var objectContainer = $('object-container');
  if (objectContainer) {
    var z = makeContent();
    var ihtml2 = '<object src="data:text/html,<body bgcolor=green>Guest ' + z + '</body>"' +
      ' style="height: 100px;" partition="persist:123" type="application/browser-plugin"></object>';
    objectContainer.innerHTML = ihtml2;
  } else {
    LOG('object-container not found');
  }

  /*
  var objectContainer2 = $('object-container2');
  if (objectContainer2) {
    var ihtml2 = '<object src="data:text/html,<body bgcolor=green><input type=text ></body>"' +
      ' style="height: 100px;" partition="persist:123" type="application/browser-plugin"></object>';
    objectContainer2.innerHTML = ihtml2;
  } else {
    LOG('object-container2 not found');
  }
  */
};
