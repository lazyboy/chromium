window.onload = function() {
  var select = document.querySelector('select');
  select.onchange = function(e) {
    var newValue = select;
    chrome.system.display.getInfo(function(displayInfos) {
      var displayInfo = displayInfos[0];
      var displayInfoId = displayInfo.id;
      var currentRotation = displayInfo.rotation;
      var newValue = select.value;
      var newRotation = 1 * newValue;
      if (newRotation != currentRotation) {
        window.console.log('changing rotation from: ' + currentRotation +
                           ', to: ' + newRotation);
        var newInfo = {rotation: newRotation};
        chrome.system.display.setDisplayProperties(
            displayInfoId,
            newInfo,
            function() {
              if (chrome.runtime.lastError) {
                window.console.log('Error changing rotation.');
                window.console.log('Error message: ' + chrome.runtime.lastError.message);
                return;
              }
              window.console.log('Display rotation successful.');
            });
      }
    });
  };
  window.console.log('app initialized');
};
