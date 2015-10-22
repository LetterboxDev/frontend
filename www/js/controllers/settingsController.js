angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope) {
  var perfectMatch = window.localStorage.getItem('perfectMatch');
  var preferFemale = window.localStorage.getItem('preferFemale');
  var preferMale = window.localStorage.getItem('preferMale');
  var distanceRadius = window.localStorage.getItem('distanceRadius');

  $scope.preference = {
    perfectMatch: (perfectMatch === 'true' ? true : false),
    preferFemale: (preferFemale === 'true' ? true : false),
    preferMale: (preferMale === 'true' ? true : false),
    distanceRadius: (distanceRadius == null ? 50 : distanceRadius) //in km
  }

  $scope.onChangePerfectMatch = function() {
    window.localStorage.setItem('perfectMatch', $scope.preference.perfectMatch);
  }

  $scope.onChangePreferFemale = function() {
    window.localStorage.setItem('preferFemale', $scope.preference.preferFemale);
  }

  $scope.onChangePreferMale = function() {
    window.localStorage.setItem('preferMale', $scope.preference.preferMale);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.preference.distanceRadius);
  }
});
