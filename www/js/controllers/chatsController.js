angular.module('letterbox.controllers')

.controller('ChatsCtrl', function($scope,
                                  $state,
                                  RoomsService,
                                  eventbus) {

  $scope.chats = [];

  function updateRooms(rooms) {
    var temp = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      RoomsService.getLatestRoomInfo(room.hash).then(function(room) {
        var latestMessage = room.latestMessage;
        var last_message = latestMessage.content ? (latestMessage.sender === window.localStorage.getItem('hashedId') ? 'You: ' : room.userName + ': ') + latestMessage.content : 'No messages yet';
        var last_activity = latestMessage.timeSent ? new Date(latestMessage.timeSent) : new Date(room.createdAt);
        var newChat = {
          id: room.hash,
          from: room.userName,
          profile_pic: room.thumbnail,
          last_message: last_message,
          last_activity: last_activity
        };
        temp.push(newChat);
        temp.sort(function(a, b) {
          return b.last_activity.getTime() - a.last_activity.getTime();
        });
      });
    }
    $scope.chats = temp;
  }
  $scope.$on('$ionicView.enter', RoomsService.updateRooms);
  eventbus.registerListener('roomsUpdated', updateRooms);
  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    for (var i = 0; i < $scope.chats.length; i++) {
      if ($scope.chats[i].id === message.RoomHash) {
        $scope.chats[i].last_message = (message.sender === window.localStorage.getItem('hashedId') ? 'You: ' : $scope.chats[i].from + ': ') + message.content;
        $scope.chats[i].last_activity = new Date(message.timeSent);
        break;
      }
    }
    $scope.chats.sort(function(a, b) {
      return b.last_activity.getTime() - a.last_activity.getTime();
    });
    $scope.$apply();
  });
});
