angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope) {
  var minCorrect = window.localStorage.getItem('minCorrect');
  var distanceRadius = window.localStorage.getItem('distanceRadius');
  $scope.preference = {
    minCorrect: (minCorrect == null ? 3 : minCorrect),
    distanceRadius: (distanceRadius == null ? 50 : distanceRadius) //in km
  }

  $scope.onChangeMinCorrect = function() {
    window.localStorage.setItem('minCorrect', $scope.data.minCorrect);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.data.distanceRadius);
  }
});
