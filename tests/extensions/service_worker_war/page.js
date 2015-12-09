var addIframe = function() {
  var iframe = document.createElement('iframe');
  iframe.style.width = '640px';
  iframe.style.height = '480px';
  document.body.appendChild(iframe);
  iframe.src = 'hello.txt';
};

window.onload = function(e) {
  console.log('window.onload');

  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    return registration.ready;
  }).then(function(registration) {
    console.log('service worker registration ready');
    addIframe();
  });
};
