angular.module('letterbox.controllers')

.controller('HomeCtrl', function($scope,
                                 $state,
                                 $ionicHistory,
                                 NotificationsService,
                                 RoomsService,
                                 eventbus) {

  $scope.numberOfLetters = 0;
  $scope.numberOfMessages = 0;

  function updateLetterCount() {
    NotificationsService.getNumberOfNotifications()
    .then(function(numberOfLetters) {
      $scope.numberOfLetters = numberOfLetters;
    });
  }

  function updateMessagesCount() {
    RoomsService.getTotalUnreadCount().then(function(count) {
      $scope.numberOfMessages = count;
    });
  }

  eventbus.registerListener('letterReceived', updateLetterCount);
  eventbus.registerListener('unreadCountChanged', updateMessagesCount);

  $scope.$on('$ionicView.enter', function() {
    eventbus.call('enterHome');
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    updateLetterCount();
    updateMessagesCount();
  });

  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

