angular.module('starter.controllers', ['ionic.contrib.ui.cards'])

.controller('AppCtrl', function($scope, $state, $location, eventbus, socket) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Eventbus for loose coupling of components
  eventbus.registerListener('loginCompleted', socket.init);
  eventbus.registerListener('roomCreated', function(data) {
    console.log(data);
    alert('Room created: ' + JSON.stringify(data));
  });
  eventbus.registerListener('roomMessage', function(data) {
    console.log(data);
    alert('Message received: ' + JSON.stringify(data));
  });
  eventbus.registerListener('letterReceived', function(data) {
    console.log(data);
    alert('Letter received: ' + JSON.stringify(data));
  });
  if (window.localStorage.getItem('token')) {
    socket.init();
  }

  if (!window.localStorage.getItem('token')) {
    $state.go('login');
  } else if (window.localStorage.getItem('isRegistered') === 'false') {
    $state.go('onboarding', {onboardStep: 1});
  }

  $scope.currentPage = function() {
    return $location.path().split('/')[2];
  };

  $scope.username = window.localStorage.getItem('firstName');
});

