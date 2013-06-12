var LOG = function(msg) { window.console.log(msg); };

LOG('BEG - app2');
var s = document.createElement('webview')
// check
s.src = 'http://google.com';
document.body.appendChild(s);

LOG('END - app2');
