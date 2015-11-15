angular.module('letterbox.services')

.service('RoomsService', function($q,
                                  backend,
                                  DbService,
                                  eventbus) {

  var RoomsService = {};
  var roomsCache = [];
  var chats = [];
  var chatsPageScope = null;
  var notifsPageScope = null;

  eventbus.registerListener('roomsUpdated', function(rooms) {
    roomsCache = rooms;
    updateChats(rooms);
  });

  eventbus.registerListener('roomRead', function(roomRead) {
    for (var i = 0; i < chats.length; i++) {
      var chat = chats[i];
      if (chat.id === roomRead.roomHash) {
        chat.unread_count = 0;
        break;
      }
    }
    eventbus.call('unreadCountChanged');
  });

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    for (var i = 0; i < chats.length; i++) {
      if (chats[i].id === message.RoomHash) {
        chats[i].last_message = (message.sender === window.localStorage.getItem('hashedId') ? 'You: ' : chats[i].from + ': ') + message.content;
        chats[i].last_activity = new Date(message.timeSent);
        if (message.sender !== window.localStorage.getItem('hashedId')) {
          chats[i].unread_count++;
          eventbus.call('unreadCountChanged');
        }
        break;
      }
    }
    chats.sort(function(a, b) {
      return b.last_activity.getTime() - a.last_activity.getTime();
    });
  });

  function formatChat(room) {
    var latestMessage = room.latestMessage;
    var last_message = latestMessage.content ? (latestMessage.sender === window.localStorage.getItem('hashedId') ? 'You: ' : room.userName + ': ') + latestMessage.content : 'No messages yet';
    var last_activity = latestMessage.timeSent ? new Date(latestMessage.timeSent) : new Date(room.createdAt);
    return {
      id: room.hash,
      from: room.userName,
      profile_pic: room.thumbnail,
      last_message: last_message,
      last_activity: last_activity,
      unread_count: room.unreadCount
    };
  }

  function updateChats(rooms) {
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      RoomsService.getLatestRoomInfo(room.hash).then(function(room) {
        var chat = formatChat(room);
        var chatPresent = false;
        var chatModified = false;
        for (var j = 0; j < chats.length; j++) {
          if (chats[j].id === chat.id) {
            if (chats[j].last_message !== chat.last_message) {
              chats[j].last_message = chat.last_message;
              chatModified = true;
            }
            if (chats[j].last_activity.getTime() !== chat.last_activity.getTime()) {
              chats[j].last_activity = chat.last_activity;
              chatModified = true;
            }
            if (chats[j].unread_count !== chat.unread_count) {
              chats[j].unread_count = chat.unread_count;
              eventbus.call('unreadCountChanged');
              chatModified = true;
            }
            chatPresent = true;
            break;
          }
        }
        if (!chatPresent) {
          chats.push(chat);
          if (chat.unread_count) eventbus.call('unreadCountChanged');
          chatModified = true;
        }
        if (chatModified) {
          chats.sort(function(a, b) {
            return b.last_activity.getTime() - a.last_activity.getTime();
          });
          if (chatsPageScope) chatsPageScope.$apply();
          if (notifsPageScope) notifsPageScope.$apply();
        }
      });
    }
  }

  RoomsService.getTotalUnreadCount = function() {
    var deferred = $q.defer();
    var total = 0;
    for (var i = 0; i < chats.length; i++) {
      total += chats[i].unread_count;
    }
    deferred.resolve(total);
    return deferred.promise;
  };

  RoomsService.setChatsPageScope = function($scope) {
    chatsPageScope = $scope;
  };

  RoomsService.setNotifsPageScope = function($scope) {
    notifsPageScope = $scope;
  };

  RoomsService.getChats = function() {
    return chats;
  };

  RoomsService.getRoom = function(hash) {
    for (var i = 0; i < roomsCache.length; i++) {
      if (roomsCache[i].hash === hash) return roomsCache[i];
    }
    return null;
  };

  RoomsService.getLatestRoomInfo = function(hash) {
    var deferred = $q.defer();
    if (!window.cordova || !DbService.isInitialized()) {
      backend.getSingleRoom(hash).$promise
      .then(function(room) {
        deferred.resolve(room);
      });
    } else {
      DbService.getSingleRoom(hash)
      .then(function(room) {
        deferred.resolve(room);
      })
    }
    return deferred.promise;
  };

  RoomsService.updateRooms = function() {
    if (!window.cordova || !DbService.isInitialized()) {
      backend.getRooms().$promise.then(function(rooms) {
        var res = [];
        rooms.forEach(function(room) {
          res.push(room);
        });
        eventbus.call('roomsUpdated', res);
      });
    } else {
      DbService.getRooms().then(function(rooms) {
        eventbus.call('roomsUpdated', rooms);
      });
    }
  };

  RoomsService.getRoomLetter = function(hash) {
    var deferred = $q.defer();
    backend.getSingleRoom(hash).$promise
    .then(function(room) {
      deferred.resolve(room.letter);
    }, function() {
      deferred.reject();
    });
    return deferred.promise;
  };

  eventbus.registerListener('loginCompleted', RoomsService.updateRooms);

  return RoomsService;
});
