var getJavaScriptCode = function() {
  var ar = [];
  ar.push('var c = document.createElement("canvas");');
  ar.push('c.id = "foobar";');
  ar.push('c.width = 200; c.height = 100;');
  ar.push('c.style.border = "1px solid black";');
  ar.push('document.body.appendChild(c);');
  ar.push('var ctx = c.getContext("2d");');
  ar.push('ctx.fillStyle = "#00FF00";');
  ar.push('ctx.fillRect(0, 0, 150, 75);');
  return ar.join('');
};

window.onload = function() {
  var w = document.querySelector('webview');
  w.addEventListener('loadstop', function(e) {
    w.executeScript({ code: getJavaScriptCode(), }, function(results) {
    // Files can be used too.
    //w.executeScript({ file: 'foo.js', }, function(results) {
      window.console.log('got executeScript results of length: ' + results.length);
      window.console.log(results[0]);
    });
  });
};
