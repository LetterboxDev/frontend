angular.module('letterbox.controllers')

.controller('ChatsCtrl', function($scope, $state, RoomsService, eventbus) {
  $scope.chats = [];

  function updateRooms(rooms) {
    var temp = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      var newChat = {
        hash: room.hash,
        from: room.userName,
        profile_pic: room.thumbnail,
        last_message: "I'm hungry",
        last_activity: "1h"
      };
      temp.push(newChat);
    }
    $scope.chats = temp;
  }
  RoomsService.updateRooms();
  eventbus.registerListener('roomsUpdated', updateRooms);
});

