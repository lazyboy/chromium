var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

var init = function() {
  document.onwebkitfullscreenerror = function(e) {
    LOG('Embedder: onwebkitfullscreenerror: ' + e);
  };
  document.onwebkitfullscreenchange = function(e) {
    LOG('Embedder: onwebkitfullscreenchange: ' + e);
  };

  var w2 = $('w2');
  if (w2) {
    w2.addEventListener('consolemessage', function(e) {
      LOG('G: ' + e.message);
    });
    LOG('adding consolemessage handler');
  }
};

var fullscreenImpl = function(elem) {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};

var goElementFullscreen = function() {
  LOG('Embedder element go fullscreen');
  fullscreenImpl(document.getElementById('efullscreen'));
};

var goPageFullscreen = function() {
  LOG('Embedder document go fullscreen');
  fullscreenImpl(document.documentElement);
};

/*
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
    var elem = document.documentElement;
    elem = document.getElementById('efullscreen');
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};
*/

var exitFullscreen = function() {
  var elem = document.getElementById('efullscreen');
  if (elem) {
    //LOG('call elem.webkitCancelFullScreen()');
    //elem.webkitCancelFullScreen();
    LOG('call document.webkitCancelFullScreen()');
    document.webkitCancelFullScreen();
  }
};

window.onload = function() {
  init();
  /*
  $('w1').addEventListener('loadstop',
      function() {
        LOG('***************************** simple-webview loadstop');
      });
  */
  $('e-button').onclick = function(e) {
    goElementFullscreen();
  };
  $('e-cancel-button').onclick = function(e) {
    exitFullscreen();
  };
  $('e-whole-button').onclick = function(e) {
    goPageFullscreen();
  };

  var count = 0;
  $('w2').addEventListener('permissionrequest', function(e) {  // github page.
    window.console.log('permissionrequest: e.permission: ' + e.permission);
    if (e.permission !== 'fullscreen') return;
    window.console.log('w2.permissionrequest.fullscreen');
    window.console.log('url: ' + e.url);
    if (count % 2) { window.console.log('allow'); e.request.allow(); }
    else { window.console.log('deny'); e.request.deny(); }
    //e.request.allow();
    ++count;
  });
  /*
  $('w4').addEventListener('permissionrequest', function(e) {  // Youtube.
    if (e.permission !== 'fullscreen') return;
    window.console.log('w4.permissionrequest.fullscreen');
    window.console.log('url: ' + e.url);
    e.request.allow();
  });
  */
  LOG('registered click');
};
