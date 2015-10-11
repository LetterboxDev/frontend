angular.module('starter.controllers')

.controller('ChatsCtrl', function($scope, $state, NotificationsService, backend) {
  $scope.chats = [];

  backend.getRooms().$promise.then(function(res) {
    res.forEach(function(chat) {
      var partnerId = (chat.user1 === window.localStorage.getItem('hashedId')) ? chat.user2 : chat.user1;
      backend.getOtherUser(partnerId).$promise.then(function(res) {
        var newChat = {
          hash: chat.hash,
          from: res.firstName,
          profile_pic: res.pictureThumb,
          last_message: "I'm hungry",
          last_activity: "1h"
        };
        $scope.chats.push(newChat);
      }, function(err) {

      });

    });
  }, function(err) {

  });

  $scope.numberOfNotifications = NotificationsService.getNumberOfNotifications();

  // navigation
  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

