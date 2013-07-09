var LOG = function(msg) { window.console.log(msg); };

var testDrag = function() {
  var el = $('#source-id');
  //var el = $(document.createElement('div')).appendTo('#source-id');
  LOG('el: ' + el);
  window.el = el;
  el.draggable({cancel: ''});
  var offsetBefore = el.offset();
  el.simulate('drag', {
    dx: 50,
    dy: 50
  });
  var offsetAfter = el.offset();

  LOG('offsetBefore: ' + offsetBefore.left + ', ' + offsetBefore.top);
  LOG('offsetAfter: ' + offsetAfter.left + ', ' + offsetAfter.top);
};

window.onload = function() {
  LOG('window.onload');

  document.getElementById('start-button').onclick = function(e) {
    LOG('start testDrag');
    testDrag();
  };
};
