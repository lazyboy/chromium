    var startTest = function() {
      window.console.log('start...');
      var d = document.querySelector('.rotate-me');
      window.console.log('d: ' + d);
      var isLoading = true;
      var iterCount = 0;

      d.addEventListener('webkitAnimationIteration', function(e) {
        //window.console.log('webkitAnimationIteration');
        if (isLoading) {
          ++iterCount;
          if (iterCount > 2) {
            window.console.log('stop animation');
            isLoading = false;
            d.classList.remove('spinning123');
          }
        }
      });
    };

onload = function() {
  startTest();
};
