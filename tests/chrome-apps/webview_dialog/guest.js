var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

var addStuff = function() {
  LOG('[G] window.onload');

  var b = document.createElement('button');
  b.innerText = 'Click for confirm dialog';
  b.onclick = function(e) {
    LOG('button click');
    var res = window.confirm("Are you sure?");
    LOG('confirm returns: ' + res);
  };
  document.body.appendChild(b);

  var i = document.createElement('input');
  i.type = 'text';
  i.value = 'initial value';
  document.body.appendChild(i);
};

window.setTimeout(addStuff, 200);
