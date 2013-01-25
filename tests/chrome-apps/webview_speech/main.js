var addGuest = function() {
  window.console.log('adding guest');
  var el = document.createElement('webview');
  document.body.appendChild(el);
  var guestSrc = 'data:text/html,<body><div>Guest</div>' +
      '<input type=text name=spoken-input placeholder="say sth"' +
      '    size=50 speech x-webkit-speech id="sid">' +
      '</body>';
  window.console.log('setting src');
  el.setAttribute('src', guestSrc);
  window.console.log('complete setting src');
};
window.onload = function() {
  window.console.log('onload');
  var el = document.getElementById('sid');
  if (!el) { window.console.log('element not found'); return; }
  el.onspeechchange = function() { window.console.log('**** onspeechchange'); }
  addGuest();
};
