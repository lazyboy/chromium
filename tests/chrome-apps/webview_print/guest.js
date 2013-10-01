var LOG = function(msg) {
  window.console.log(msg);
};

var test = function() {
  LOG('test begin');

  var onPrintClick = function() {
    LOG('onPrintClick');
    window.print();
  };

  var button = document.createElement('button');
  button.innerText = 'Check window.print';
  button.onclick = onPrintClick;

  var div = document.createElement('div');
  div.style.height = '100px';
  div.style.width = '200px';
  div.style.backgroundColor = 'red';
  document.body.appendChild(div);

  div.appendChild(button);
  LOG('test end');
};

test();
