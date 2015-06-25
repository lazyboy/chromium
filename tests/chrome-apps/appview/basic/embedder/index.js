
document.getElementById('button').addEventListener('click', function() {
  var appview = document.createElement('appview');
  document.body.appendChild(appview);
  appview.connect('hpkfkbodpaljnnjnflbgefgphkkbpkco', null, function(success) {
    console.log('appview embed success: ' + success);
  });
});
