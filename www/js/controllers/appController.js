angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Facebook, $cordovaOauth, backend) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // TODO Check if user is already logged in
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    if (!window.localStorage.getItem('token')) {
      $scope.modal.show();      
    }
  });

  $scope.authenticateToken = function(fbToken) {
    $scope.testing = 'fb_token: ' + fbToken;
    backend.auth(fbToken).$promise.then(function(success) {
      window.localStorage.setItem('token', success.letterbox_token);
      window.localStorage.setItem('firstName', success.user.firstName);
      window.localStorage.setItem('hashedId', success.user.hashedId);
      window.localStorage.setItem('isRegistered', success.user.isRegistered);
      $scope.modal.hide();
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
        // make request to server if new or returning, get letterbox_token
      });
    } else {
      $cordovaOauth.facebook('1674828996062928', ['public_profile','user_birthday','user_education_history','user_work_history']).then(function(res) {
        // make request to server if new or returning, get letterbox_token
        $scope.authenticateToken(res.access_token);
      }, function(err) {
        // inform of error
      });
    }
  };
});

