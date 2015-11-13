angular.module('letterbox.controllers')

.controller('ResponseCtrl', function($scope,
                                     $state,
                                     $stateParams,
                                     $ionicHistory,
                                     backend,
                                     NotificationsService,
                                     ProfileService,
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

  $scope.viewDeal = function(deal) {
    $state.go('app.deal', { dealId: deal.id });
  };

  function getNotification() {
    if ($stateParams.isExistingChat) {
      $scope.isExistingChat = $stateParams.isExistingChat;
    } else {
      $scope.isExistingChat = false;
    }

    NotificationsService.getNotificationsList().then(function(notifications) {
      NotificationsService.getNotificationFromId($stateParams.responseId).then(function(notification) {
        $scope.response = notification;
        $scope.numCorrect = notification.questionsAnswers.filter(function(obj) {
          return obj.isCorrect == true 
        }).length;
        ProfileService.getOtherProfile(notification.userId).then(function(user) {
          $scope.response.mutual_friends_count = (typeof user.mutualFriends === 'undefined') ? 'unknown' : user.mutualFriends.summary.total_count;
          $scope.response.likedDeals = user.likedDeals;
        })
      });
    });
    
  }
});

