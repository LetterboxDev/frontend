angular.module('letterbox.controllers')

.controller('ResponseCtrl', function($scope, $state, $stateParams, $ionicHistory, backend, NotificationsService, eventbus) {

  function getNotification() {
    NotificationsService.getNotificationFromId($stateParams.responseId).then(function(notification) {
      $scope.response = notification;
    });
  }

  getNotification();

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.rejectLetter = function(letter) {
    // rejects the letter and refresh notifs
    backend.rejectLetter(letter.id, function() {
      eventbus.call('letterReceived'); //TODO this triggers an unrelated prompt
      $state.go('app.notifications');
    });
  };

  $scope.approveLetter = function(letter) {
    // approves letter, opens a chat and refresh notifs
    backend.approveLetter(letter.id, function() {
      eventbus.call('letterReceived'); //TODO this triggers an unrelated prompt
      $state.go('app.chat', {chatId: letter.id});
    });
  };
});