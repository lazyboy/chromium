var LOG = function(msg) {
  window.console.log(msg);
};

var onButtonClick = function() {
  LOG('onButtonClick');
  var clearDataOptions = {};
  var clearDataType = {appcache:true, cookies:true, fileSystems:true, indexedDB:true, localStorage:true, webSQL:true};
  foowebview.clearData( clearDataOptions, clearDataType);
  foowebview.src="http://twitter.com/";
  //foowebview.src="http://www.google.com";
};


window.onload = function() {
  var button = document.getElementById('clearbutton');
  button.addEventListener('click', onButtonClick);
  LOG('button click registered');
};
