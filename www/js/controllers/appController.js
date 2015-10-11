angular.module('starter.controllers', ['ionic.contrib.ui.cards'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Facebook, $cordovaOauth, backend) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicModal.fromTemplateUrl('templates/onboard1.html', {
    scope: $scope,
    hardwareBackButtonClose: false
  }).then(function(onboardModal) {
    $scope.onboardModal1 = onboardModal;
  });

  $ionicModal.fromTemplateUrl('templates/onboard2.html', {
    scope: $scope,
    hardwareBackButtonClose: false
  }).then(function(onboardModal) {
    $scope.onboardModal2 = onboardModal;
  });

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    hardwareBackButtonClose: false
  }).then(function(loginModal) {
    $scope.loginModal = loginModal;
    if (!window.localStorage.getItem('token')) {
      $scope.loginModal.show();
    }
    $scope.beginOnboarding();
  });

  $scope.beginOnboarding = function() {
    if (window.localStorage.getItem('token') && window.localStorage.getItem('isRegistered') === 'false') {
      $scope.onboardModal1.show();
    }
  };

  $scope.selectGender = function(gender) {
    $scope.gender = gender;
    console.log($scope.gender);
  }

  $scope.selectGenderPref = function(gender) {
    $scope.genderPref = gender;
    console.log($scope.genderPref);
  }

  $scope.completeOnboardingStep1 = function() {
    $scope.onboardModal1.hide();
    $scope.onboardModal2.show();
  };

  $scope.completeOnboarding = function() {
    window.localStorage.setItem('isRegistered', 'true');
    $scope.onboardModal2.hide();
  };

  $scope.authenticateToken = function(fbToken) {
    $scope.testing = 'fb_token: ' + fbToken;
    backend.auth(fbToken).$promise.then(function(success) {
      window.localStorage.setItem('token', success.letterbox_token);
      window.localStorage.setItem('firstName', success.user.firstName);
      window.localStorage.setItem('hashedId', success.user.hashedId);
      window.localStorage.setItem('isRegistered', success.user.isRegistered);
      $scope.loginModal.hide();
      $scope.beginOnboarding();
    }, function(error) {
      // error something went wrong
    });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    if (!window.cordova) {
      Facebook.login(function(response) {
        if (response.status === 'connected') {
          $scope.authenticateToken(response.authResponse.accessToken);
        } else {
          // error, something went wrong
        }
      });
    } else {
      $cordovaOauth.facebook('1674828996062928', ['public_profile','user_birthday','user_education_history','user_work_history']).then(function(res) {
        $scope.authenticateToken(res.access_token);
      }, function(err) {
        // inform of error
      });
    }
  };
});

