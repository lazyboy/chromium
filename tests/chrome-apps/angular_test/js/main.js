var cTestApp = angular.module('cTestAppNew', []);

/*
cTestApp.controller('cTestController', ['$scope', function($scope) {
  $scope.ready = false;
  $scope.test = 'bar';
  var oScope = $scope;
  window.setTimeout(function() {
    window.console.log('change stuff');
    $scope.test = 'new stuff';
    $scope.ready = true;
    oScope.ready = true;
  }.bind(this), 1000);
}]);
*/

cTestApp.controller('cTestController', function() {
  this.ready = false;
  this.test = 'bar';
});

var anotherApp = angular.module('AnotherApp', []);
anotherApp.controller('AnotherController', ['$timeout', function($timeout) {
  this.value = 'Another stuff';
  var self = this;
  $timeout(function() { self.value = 'CHANGED'; }, 3000);
}]);

window.onload = function() {
  angular.bootstrap(document.getElementById('another-app'),
                    ['AnotherApp']);
};
