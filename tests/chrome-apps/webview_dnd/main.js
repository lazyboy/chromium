var $ = function(id) {
  return document.getElementById(id);
};

var initializeDragAndDrop = function() {
  var src = $('src');
  var dst = $('dst');
  var curtDropState = 0;
  var srcCounter = 0;

  src.addEventListener('dragstart', function(e) {
  window.console.log('dragstart');
    e.dataTransfer.setData('Text', 'Rocket: ' + srcCounter);
    ++srcCounter;
  }, false);

  dst.addEventListener('dragenter', function(e) {
    e.preventDefault();
  }, false);
  dst.addEventListener('dragover', function(e) {
    e.preventDefault();
  }, false);
  dst.addEventListener('drop', function(e) {
    var data = e.dataTransfer.getData('Text');

    dst.style.backgroundColor = curtDropState == 0 ? 'blue' : 'green';
    dst.innerHTML += ' ' + data;
    curtDropState = 1 - curtDropState;
  }, false);
};

window.onload = function() {
  initializeDragAndDrop();
};
