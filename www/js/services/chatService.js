angular.module('starter.services')

.service('ChatService', function($q) {
  return {
    getRecipientName: function(chatId) {
      var dfd = $q.defer();
      dfd.resolve("Cassandra Ong");
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
      }
      ])
      return dfd.promise;
    }
  }
});