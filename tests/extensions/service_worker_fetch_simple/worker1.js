self.onmessage = function(e) {
  e.ports[0].postMessage('pong');
};

self.onfetch = function(e) {
  console.log(e.request.url);
  if (/fetch_trap$/.test(e.request.url)) {
    console.log('trapped');
    e.respondWith(new Response('Hello from ServiceWorker', {
      'Content-Type': 'text/plain'
    }));
  }
};
