var $ = function(id) { return document.getElementById(id); };
window.onload = function() {
  $('move-button').onclick = function(e) {
    window.moveTo(100, 100);
  };
};
