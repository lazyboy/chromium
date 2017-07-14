var $ = function(id) {
  return document.getElementById(id);
};

var div = document.createElement('div');
div.innerText = 'Content script';
div.style.width = '400px';
div.style.height = '400px';
div.style.backgroundColor = 'white';
div.style.position = 'absolute';
//div.style.opacity = '0.5';
document.body.firstChild.nextSibling.appendChild(div);
