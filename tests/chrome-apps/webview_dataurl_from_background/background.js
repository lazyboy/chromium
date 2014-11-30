/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  var dataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFAQMAAAC3obSmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX//wD///+LefOdAAAAAWJLR0QB/wIt3gAAAAtJREFUCNdjYIABAAAKAAHn+Nr6AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE0LTExLTMwVDE5OjA1OjQ3KzAxOjAwwiVbngAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0xMS0zMFQxOTowNTo0NyswMTowMLN44yIAAAAASUVORK5CYII=';
  chrome.app.window.create('main.html',
      function(win) {
        console.log('got win callback');
        win.dataUrl = dataURI;
      });
});
