angular.module('letterbox.controllers')

.controller('NotificationsCtrl', function($scope,
                                          $state,
                                          $ionicModal,
                                          NotificationsService,
                                          RoomsService,
                                          eventbus,
                                          backend) {

  $scope.notifications = [];
  $scope.chats = [];
  $scope.isLoading = false;
  $scope.viewingNotifications = 'letters';

  function refreshNotifications() {
    $scope.isLoading = true;
    NotificationsService.getNotificationsList().then(function(notifications) {
      $scope.notifications = notifications;
      $scope.isLoading = false;
    });
  }

  function formatChat(room) {
    var latestMessage = room.latestMessage;
    var last_message = latestMessage.content ? (latestMessage.sender === window.localStorage.getItem('hashedId') ? 'You: ' : room.userName + ': ') + latestMessage.content : 'No messages yet';
    var last_activity = latestMessage.timeSent ? new Date(latestMessage.timeSent) : new Date(room.createdAt);
    return {
      id: room.hash,
      from: room.userName,
      profile_pic: room.thumbnail,
      last_message: last_message,
      last_activity: last_activity
    };
  }

  function updateRooms(rooms) {
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      RoomsService.getLatestRoomInfo(room.hash).then(function(room) {
        var chat = formatChat(room);
        var chatModified = false;
        for (var j = 0; j < $scope.chats.length; j++) {
          if ($scope.chats[j].id === chat.id) {
            $scope.chats[j] = chat;
            chatModified = true;
            break;
          }
        }
        if (!chatModified) {
          $scope.chats.push(chat);
        }
        $scope.chats.sort(function(a, b) {
          return b.last_activity.getTime() - a.last_activity.getTime();
        });
      });
    }
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.refreshRooms = function() {
    RoomsService.updateRooms();
  };

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

  eventbus.registerListener('letterReceived', refreshNotifications);

  $scope.$on("$ionicView.enter", function(scopes, states) {
    refreshNotifications();
    RoomsService.updateRooms();
  });

  $scope.selectNotification = function(notification) {
    notification.isRead = true;
    $scope.selectedLetter = notification;
    backend.markLetterAsRead(notification.id);
    $state.go('app.response', {responseId: notification.id});
  };
});
