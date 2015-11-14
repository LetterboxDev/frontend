angular.module('letterbox.controllers')

.controller('AppCtrl', function($scope,
                                $state,
                                $location,
                                $ionicPopup,
                                $ionicLoading,
                                eventbus,
                                socket,
                                LocationService,
                                LocalNotificationService,
                                BackgroundService,
                                DbService,
                                RoomsService,
                                ChatService,
                                AuthService,
                                PushService,
                                ChromeNotifService,
                                VibrateService) { // Leave VibrateService here to init the service

  $scope.username = window.localStorage.getItem('firstName') ? window.localStorage.getItem('firstName') : '';
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

  eventbus.registerListener('loginCompleted', PushService.updatePushToken);

  // Update $scope.username on login completed
  eventbus.registerListener('loginCompleted', function() {
    $scope.username = window.localStorage.getItem('firstName');
  });

  // Initialize ChatService when db initialized
  eventbus.registerListener('dbInitialized', ChatService.init);
  // Sync database with backend whenever socket is reconnected
  eventbus.registerListener('dbInitialized', ChatService.sync);

  // Sync database with backend whenever socket is reconnected
  eventbus.registerListener('socketConnected', ChatService.sync);

  eventbus.registerListener('pushTokenSet', PushService.updatePushToken);

  eventbus.registerListener('roomCreated', function(data) {
    RoomsService.updateRooms();
    $ionicPopup.confirm({
      title: data.approverName + ' just started a chat with you!',
      template: 'Start chatting?',
      cssClass: "popup-alert"
    }).then(function(res) {
      if (res) {
        $state.go('app.chat', {chatId: data.room.hash});
      }
    });
  });

  eventbus.registerListener('letterReceived', function(data) {
    $ionicPopup.confirm({
      title: 'New Letter Received!',
      template: 'Proceed to notifications?',
      cssClass: "popup-alert"
    }).then(function(res) {
      if (res) {
        $state.go('app.notifications');
      }
    });
  });

  window.addEventListener('focus', function(event) {
    eventbus.call('windowFocused');
  }, false);

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  if (window.localStorage.getItem('token')) {
    $scope.showLoading();
    AuthService.renewToken()
    .then(function() {
      $scope.hideLoading();
      eventbus.call('loginCompleted');
      if (window.localStorage.getItem('isRegistered') === 'false') {
        $state.go('onboarding', {onboardStep: 1});
      }
    }, function() {
      $scope.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Authentication Error!',
        template: 'Please log in again',
        cssClass: "popup-alert"
      });
      alertPopup.then(function(res) {
        $state.go('login');
      });
    });
  } else {
    $state.go('login');
  }

  $scope.currentPage = function() {
    return $location.path().split('/')[2];
  };
});

