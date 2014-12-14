var cTestApp = angular.module('cTestAppNew', []);

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

function JSONModel(name, title) {
  this.name = name;
  this.title = title;
};

anotherApp.controller('EditTest', ['$scope', function($scope) {
  var ar = [];
  ar.push(new JSONModel('John', 'Salut'));
  ar.push(new JSONModel('Xander', 'Hello'));
  ar.push(new JSONModel('Tyler', 'Fight'));
  $scope.data = ar;
}]);

window.onload = function() {
  angular.bootstrap(document.getElementById('another-app'),
                    ['AnotherApp']);
};
