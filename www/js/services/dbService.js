angular.module('starter.services')

.service('DbService', function($q, $cordovaSQLite) {
  var db = {isInitialized: false};
  var DbService = {};

  function checkInit(deferred) {
    if (!db.isInitialized || typeof db.sqlite === 'undefined') deferred.reject({err: 'DbService not initialized'});
  }

  DbService.init = function() {
    if (window.cordova) {
      db.sqlite = $cordovaSQLite.openDB({name: 'letterbox.db'});
      db.isInitialized = true;
      alert('DbService initialized!');
    }
  };

  DbService.addMessage = function(roomHash, sender, content, timeSent) {
    var deferred = $q.defer();
    checkInit(deferred);
    
    return deferred.promise;
  };

  DbService.markMessagesAsRead = function(roomHash, timeSent) {
    var deferred = $q.defer();
    checkInit(deferred);
    
    return deferred.promise;
  };

  DbService.getRoomMessages = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    
    return deferred.promise;
  };

  DbService.getLastestMessage = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    
    return deferred.promise;
  };

  return DbService;
});
