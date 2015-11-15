angular.module('letterbox.controllers')

.controller('SettingsCtrl', function($scope,
                                     $state,
                                     $ionicPopup,
                                     $cordovaInAppBrowser,
                                     backend,
                                     AuthService,
                                     eventbus,
                                     VERSION) {

  $scope.minAge = 18;
  $scope.maxAge = 80;
  $scope.versionMajor = VERSION.major;
  $scope.versionMinor = VERSION.minor;
  $scope.versionRevision = VERSION.revision;

  var perfectMatch = window.localStorage.getItem('perfectMatch');
  var preferredGender = window.localStorage.getItem('genderPreference');
  var distanceRadius = window.localStorage.getItem('distanceRadius');
  var minAge = window.localStorage.getItem('minAge');
  var maxAge = window.localStorage.getItem('maxAge');

  $scope.$on('$ionicView.beforeLeave', function(){
    eventbus.call('changePreference');
  });

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
    window.localStorage.setItem('genderPreference', $scope.preference.preferredGender);
    backend.updateGenderPreference($scope.preference.preferredGender);
  }

  $scope.onChangeDistanceRadius = function() {
    window.localStorage.setItem('distanceRadius', $scope.preference.distanceRadius);
  }

  $scope.$watch('preference.age', function() {
    if (!isNaN($scope.preference.age.min)) {
      window.localStorage.setItem('minAge', $scope.preference.age.min);
    }

    if (!isNaN($scope.preference.age.max)) {
      window.localStorage.setItem('maxAge', $scope.preference.age.max);
    }
  }, true);

  $scope.openTermsOfUse = function() {
    var ref = $cordovaInAppBrowser.open('http://getletterbox.com/terms', '_blank', {
      hardwareback: 'yes',
      zoom: 'no',
      closebuttoncaption: 'Close',
      toolbarposition: 'bottom'
    });
  };

  $scope.openPrivacyPolicy = function() {
    var ref = $cordovaInAppBrowser.open('http://getletterbox.com/privacy', '_blank', {
      hardwareback: 'yes',
      zoom: 'no',
      closebuttoncaption: 'Close',
      toolbarposition: 'bottom'
    });
  };

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

  $scope.feedback = function() {
    var ref = $cordovaInAppBrowser.open('https://www.facebook.com/getletterbox', '_blank', {
      hardwareback: 'yes',
      zoom: 'no',
      closebuttoncaption: 'Close',
      toolbarposition: 'bottom'
    });
  }
});
