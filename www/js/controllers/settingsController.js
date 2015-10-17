angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope) {
  $scope.data = {
    minCorrect: (window.localStorage.getItem('minCorrect') == null ? 3 : window.localStorage.getItem('minCorrect')),
    distanceRadius: (window.localStorage.getItem('distanceRadius') == null ? 50 : window.localStorage.getItem('distanceRadius')) //in km
  }

  $scope.onChangeMinCorrect = function() {
    window.localStorage.setItem('minCorrect', $scope.data.minCorrect);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.data.distanceRadius);
  }
});
