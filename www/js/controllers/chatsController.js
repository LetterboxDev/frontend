angular.module('starter.controllers')

.controller('ChatsCtrl', function($scope, $state, backend) {
  $scope.chats = [];

  backend.getRooms().$promise.then(function(res) {
    res.forEach(function(chat) {
      var newChat = {
        hash: chat.hash,
        from: chat.userName,
        profile_pic: chat.thumbnail,
        last_message: "I'm hungry",
        last_activity: "1h"
      };
      $scope.chats.push(newChat);
    });
  }, function(err) {

  });
});

