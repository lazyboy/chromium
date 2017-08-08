var listDevices = function(e) {
  console.log('listDevices');
  chrome.imageWriterPrivate.listRemovableStorageDevices(
      function(deviceList) {
        console.log('callback');
        console.log(deviceList);
      });
};

window.onload = function() {
  document.querySelector('#list').onclick = listDevices;
};
