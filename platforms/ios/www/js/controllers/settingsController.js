angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope, $state, $ionicPopup, backend, AuthService) {
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

  $scope.onChangePerfectMatch = function() {
    window.localStorage.setItem('perfectMatch', $scope.preference.perfectMatch);
    backend.updatePerfectMatch($scope.preference.perfectMatch);
  }

  $scope.onChangePreferredGender = function() {
    window.localStorage.setItem('preferredGender', $scope.preference.preferredGender);
    backend.updateGenderPreference($scope.preference.preferredGender);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.preference.distanceRadius);
  }

  $scope.onChangeAgeRange = function() {
    window.localStorage.setItem('minAge', $scope.preference.age.min);
    window.localStorage.setItem('maxAge', $scope.preference.age.max);
  }

  $scope.logout = function() {
    $ionicPopup.confirm({
      title: "Are you sure you want to logout?",
      cssClass: "popup-alert",
      okType: "button-positive",
      okText: "Logout",
      cancelText: "No"
    }).then(function(res) {
      if (res) {
        AuthService.logout().then(function(){$state.go('login')});
      }
    });
  }
});
