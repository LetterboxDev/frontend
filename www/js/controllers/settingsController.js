angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope, $state, backend, AuthService) {
  $scope.minAge = 18;
  $scope.maxAge = 80;

  var perfectMatch = window.localStorage.getItem('perfectMatch');
  var preferredGender = window.localStorage.getItem('preferredGender');
  var distanceRadius = window.localStorage.getItem('distanceRadius');
  var minAge = window.localStorage.getItem('minAge');
  var maxAge = window.localStorage.getItem('maxAge');

  $scope.preference = {
    perfectMatch: (perfectMatch === 'true' ? true : false),
    preferredGender: preferredGender,
    distanceRadius: (distanceRadius == null ? 50 : distanceRadius), //in km
    age: {
      min: minAge === null ? $scope.minAge : minAge,
      max: maxAge === null ? $scope.maxAge : maxAge,
    }
  }

  console.log($scope.preference);

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
