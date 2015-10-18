angular.module('letterbox.controllers', ['ionic.contrib.ui.cards'])

.controller('AppCtrl', function($scope, $state, $location, $ionicPopup, eventbus, socket, LocationService, DbService, RoomsService, ChatService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Eventbus for loose coupling of components
  // Initialize DbService when logged in
  eventbus.registerListener('loginCompleted', DbService.init);
  // Update all rooms when logged in
  eventbus.registerListener('loginCompleted', RoomsService.updateRooms);
  // Initialize socketio when logged in
  eventbus.registerListener('loginCompleted', socket.init);
  // Update user location when logged in
  eventbus.registerListener('loginCompleted', LocationService.updateLocation);
  // Initialize ChatService when logged in
  eventbus.registerListener('loginCompleted', ChatService.init);

  // Sync database with backend whenever socket is reconnected
  eventbus.registerListener('socketConnected', ChatService.sync);

  eventbus.registerListener('roomCreated', function(data) {
    RoomsService.updateRooms();
    $ionicPopup.confirm({
      title: data.approverName + ' just started a chat with you!',
      template: 'Start chatting?'
    }).then(function(res) {
      if (res) {
        // Go to chat $state.go('');
      }
    });
  });
  eventbus.registerListener('roomMessage', function(data) {
    // save to db
  });
  eventbus.registerListener('letterReceived', function(data) {
    $ionicPopup.confirm({
      title: 'New Letter Received!',
      template: 'Proceed to notifications?'
    }).then(function(res) {
      if (res) {
        $state.go('app.notifications');
      }
    });
  });
  if (window.localStorage.getItem('token')) {
    eventbus.call('loginCompleted');
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

