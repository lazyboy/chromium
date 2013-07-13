var $ = function(id) {
  return document.getElementById(id);
};

window.onload = function() {
  $('button-id').onclick = function(e) {
    $('status-div').innerText = navigator.userAgent;
  };
};
