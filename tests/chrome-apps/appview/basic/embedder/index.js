var APP_VIEW_ID = 'pnelfplagfkfljgobcabeffffihcaiio';

document.getElementById('button').addEventListener('click', function() {
  var appview = document.createElement('appview');
  document.body.appendChild(appview);
  //APP_VIEW_ID = 'hpkfkbodpaljnnjnflbgefgphkkbpkco';
  appview.connect(APP_VIEW_ID, null, function(success) {
    console.log('appview embed success: ' + success);
  });
});
