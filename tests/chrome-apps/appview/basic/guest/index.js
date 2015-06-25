
document.getElementById('button').addEventListener('click', function() {
  var appview = document.createElement("appview");
  document.body.appendChild(appview);
  appview.connect('bccakgdppmhjkehodpandddalgefolbf', null, function(success) {
    console.log('success: ' + success);
    appview.style.display='none';
    appview.offsetHeight;
    appview.style.display='';
  });
});
