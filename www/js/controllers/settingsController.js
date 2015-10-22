angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope) {
  var perfectMatch = window.localStorage.getItem('perfectMatch');
  var distanceRadius = window.localStorage.getItem('distanceRadius');
  $scope.preference = {
    perfectMatch: (perfectMatch === 'true' ? true : false),
    distanceRadius: (distanceRadius == null ? 50 : distanceRadius) //in km
  }

  $scope.onChangePerfectMatch = function() {
    window.localStorage.setItem('perfectMatch', $scope.preference.perfectMatch);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.preference.distanceRadius);
  }
});
