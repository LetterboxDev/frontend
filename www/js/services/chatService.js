angular.module('starter.services')

.service('ChatService', function($q, RoomsService) {
  return {
    getRecipientName: function(chatId) {
      var dfd = $q.defer();
      dfd.resolve("Cassandra");
      return dfd.promise;
    },
    getMessagesFromBackend: function(chatId) {
      var dfd = $q.defer();
      dfd.resolve([
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 2,
        content: "hello!",
        timestamp: "2m",
        received: false
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      {
        id: 1,
        content: "hi",
        timestamp: "3m",
        received: true
      },
      ])
      return dfd.promise;
    }
  }
});