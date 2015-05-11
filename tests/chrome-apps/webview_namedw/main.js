var LOG = function(msg) {
  window.console.log(msg);
};

var getASrc = function() {
  return '<body><div id="cross" style="background-color: red; width: 50px; height: 50px;"></body>';
};

window.onload = function() {
  var awebview = document.querySelector('#awebview');
  var bwebview = document.querySelector('#bwebview');

  awebview.addEventListener('newwindow', function(e) {
    LOG('newwindow event');
    e.window.attach(bwebview);
  });

  //awebview.src = getASrc();
  //awebview.src = 'http://jsbin.com/oGUYaxEY/1/';
  bwebview.src = 'http://jsbin.com/uqePOGa/1/';

};
