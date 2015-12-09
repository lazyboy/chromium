this.onfetch = function(e) {
  if (/\.txt$/.test(e.request.url)) {
    console.log('matches: ' + e.request.url);
    e.respondWith(new Response('hello.txt from ServiceWorker'));
  }
};
