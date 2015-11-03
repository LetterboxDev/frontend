angular.module('letterbox.services')

.service('ChatService', function($q,
                                 RoomsService,
                                 DbService,
                                 DealService,
                                 backend,
                                 eventbus) {

  var ChatService = {};

  function insertMessageIntoDb(message) {
    DbService.addMessage(message.RoomHash, message.sender, message.content, message.timeSent, message.type, message.DealId);
  };

  ChatService.init = function() {
    if (window.cordova && DbService.isInitialized()) {
      eventbus.registerListener('roomMessage', function(roomMessage) {
        insertMessageIntoDb(roomMessage.message);
      });
    }
  };

  ChatService.sync = function() {
    if (window.cordova && DbService.isInitialized()) {
      DbService.getLatestTimeSent().then(function(latestTime) {
        backend.getMessages(latestTime).$promise
        .then(function(messages) {
          messages.forEach(function(message) {
            insertMessageIntoDb(message);
          });
        });
      });
    }
  };

  ChatService.formatMessage = function(message) {
    var formatted = {
      isOwner: message.sender === window.localStorage.getItem('hashedId'),
      content: message.content,
      timestamp: new Date(message.timeSent),
      type: message.type,
    };
    if (message.type === 'share' && !message.Deal) {
      DealService.getDeal(message.DealId)
      .then(function(deal) {
        formatted.Deal = deal;
        formatted.DealId = deal.id;
      });
    } else if (message.type === 'share' && message.Deal) {
      formatted.DealId = message.Deal.id;
      formatted.Deal = message.Deal;
    }
    return formatted;
  };

  ChatService.getRecipientName = function(chatId) {
    var dfd = $q.defer();
    var room = RoomsService.getRoom(chatId);
    if (room !== null) {
      dfd.resolve(room.userName);
    } else {
      backend.getSingleRoom(chatId).$promise.then(function(room) {
        dfd.resolve(room.userName);
      });
    }
    return dfd.promise;
  };

  ChatService.getRecipientHashedId = function(chatId) {
    var dfd = $q.defer();
    var room = RoomsService.getRoom(chatId);
    if (room !== null) {
      dfd.resolve(room.userId);
    } else {
      backend.getSingleRoom(chatId).$promise.then(function(room) {
        dfd.resolve(room.userId);
      });
    }
    return dfd.promise;
  };

  ChatService.getRecipientUserData = function(chatId) {
    var deferred = $q.defer();
    ChatService.getRecipientHashedId(chatId).then(function(userId) {
      backend.getOtherUser(userId).$promise
      .then(function(user) {
        deferred.resolve(user);
      });
    });
    return deferred.promise;
  };

  ChatService.getMessagesFromBackend = function(chatId) {
    var dfd = $q.defer();
    if (!window.cordova || !DbService.isInitialized()) {
      backend.getRoomMessages(chatId).$promise
      .then(function(rawMessages) {
        var messages = [];
        rawMessages.forEach(function(rawMessage) {
          messages.push(ChatService.formatMessage(rawMessage));
        });
        messages.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
        dfd.resolve(messages);
      });
    } else {
      DbService.getRoomMessages(chatId)
      .then(function(rawMessages) {
        var messages = [];
        for (var i = 0; i < rawMessages.length; i++) {
          messages.push(ChatService.formatMessage(rawMessages[i]));
        }
        messages.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
        dfd.resolve(messages);
      });
    }
    return dfd.promise;
  };

  return ChatService;
});
