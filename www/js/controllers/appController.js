angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Facebook, $cordovaOauth) {

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
    $scope.modal.show();
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    if (!window.cordova) {
      Facebook.login(function(response) {
        // make request to server if new or returning, get letterbox_token
        $scope.modal.hide();
      });
    } else {
      $cordovaOauth.facebook('1674828996062928', ['public_profile','user_birthday','user_education_history','user_work_history']).then(function(res) {
        // make request to server if new or returning, get letterbox_token
        $scope.modal.hide();
      }, function(err) {
        // inform of error
        $scope.modal.hide();
      });
    }
  };
});

