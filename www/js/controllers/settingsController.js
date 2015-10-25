angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope, $state, backend, AuthService) {
  var perfectMatch = window.localStorage.getItem('perfectMatch');
  var preferredGender = window.localStorage.getItem('preferredGender');
  var distanceRadius = window.localStorage.getItem('distanceRadius');

  $scope.preference = {
    perfectMatch: (perfectMatch === 'true' ? true : false),
    preferredGender: preferredGender,
    distanceRadius: (distanceRadius == null ? 50 : distanceRadius) //in km
  }

  $scope.onChangePerfectMatch = function() {
    window.localStorage.setItem('perfectMatch', $scope.preference.perfectMatch);
  }

  $scope.onChangePreferredGender = function() {
    window.localStorage.setItem('preferredGender', $scope.preference.preferredGender);
    backend.updateGenderPreference($scope.preference.preferredGender);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.preference.distanceRadius);
  }

  $scope.logout = function() {
    AuthService.logout().then(function(){$state.go('login')});
  }
});
