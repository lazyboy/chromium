var $ = function(id) { return document.getElementById(id); };

var makeContent = function() {
  var ret = '';
  for (var s = 0; s < 30; ++s) ret += '<div>' + s + '</div>';
  return ret;
};

window.onload = function() {
  var y = makeContent();
  var ihtml = '<webview src="data:text/html,<body bgcolor=red>Guest' + y + '</body>" style="height: 100px;"></webview>';
  $('webview-container').innerHTML = ihtml;
};
