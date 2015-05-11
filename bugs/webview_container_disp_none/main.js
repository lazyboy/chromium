var LOG = function(msg) {
  window.console.log(msg);
};

window.onload = function() {
  var cur = 0;
  var total = 20;

  var containerDiv = document.getElementById('container');
  for (var i = 0; i < total; ++i) {
    containerDiv.innerHTML +=
      '<div class="div-container">' +
      '  <webview src="http://www.google.ca" style="width: 100px; height: 100px;">' +
      '  </webview>' +
      '</div>';
  }

  var divs = document.getElementsByClassName('div-container');
  for (var i = 0; i < divs.length; ++i) divs[i].style.display = 'none';
  divs[0].style.display = '';

/*
  window.setInterval(function() {
    var elements = document.getElementsByClassName('webview-container');
    for (var i = 0; i < elements.length; ++i) elements[i].style.display = 'none';
    elements[cur].style.display = ''
    cur = (cur + 1) % 3
  }, 300);
*/
};
