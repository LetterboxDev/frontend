angular.module('letterbox.controllers')

.controller('ResponseCtrl', function($scope,
                                     $state,
                                     $stateParams,
                                     $ionicHistory,
                                     backend,
                                     NotificationsService,
                                     eventbus) {

  getNotification();

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.rejectLetter = function(letter) {
    // rejects the letter and refresh notifs
    backend.rejectLetter(letter.id, function() {
      $state.go('app.notifications');
    });
  };

  $scope.approveLetter = function(letter) {
    // approves letter, opens a chat and refresh notifs
    backend.approveLetter(letter.id, function(room) {
      $state.go('app.chat', {chatId: room.hash});
    });
  };

  function getNotification() {
    if ($stateParams.isExistingChat) {
      $scope.isExistingChat = $stateParams.isExistingChat;
    } else {
      $scope.isExistingChat = false;
    }

    NotificationsService.getNotificationFromId($stateParams.responseId).then(function(notification) {
      $scope.response = notification;
      $scope.numCorrect = notification.questionsAnswers.filter(function(obj) {
        return obj.isCorrect == true 
      }).length;
    });
  }
});

