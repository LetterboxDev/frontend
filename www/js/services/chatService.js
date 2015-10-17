angular.module('starter.services')

.service('ChatService', function($q, RoomsService, DbService, backend) {
  var ChatService = {};

  ChatService.formatMessage = function(message) {
    return {
      isOwner: message.sender === window.localStorage.getItem('hashedId'),
      content: message.content,
      timestamp: new Date(message.timeSent)
    };
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

  ChatService.getMessagesFromBackend = function(chatId) {
    var dfd = $q.defer();
    if (!window.cordova) {
      backend.getRoomMessages(chatId).$promise
      .then(function(rawMessages) {
        var messages = [];
        rawMessages.forEach(function(rawMessage) {
          messages.push(ChatService.formatMessage(rawMessage));
        });
        messages.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
        console.log(messages);
        dfd.resolve(messages);
      });
    } else {

    }
    return dfd.promise;
  };

  return ChatService;
});