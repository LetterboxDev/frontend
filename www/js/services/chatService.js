angular.module('starter.services')

.service('ChatService', function($q, RoomsService, backend) {
  return {
    getRecipientName: function(chatId) {
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
    },
    getMessagesFromBackend: function(chatId) {
      var dfd = $q.defer();
      dfd.resolve([
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 2,
        content: "hello!",
        timestamp: "2m",
        isOwner: false
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        isOwner: true
      },
      ])
      return dfd.promise;
    }
  }
});