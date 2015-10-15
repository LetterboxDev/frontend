angular.module('starter.services')

.service('DbService', function($q, $window) {
  var db = {isInitialized: false};
  var DbService = {};

  function checkInit(deferred) {
    if (!db.isInitialized || typeof db.sqlite === 'undefined') deferred.reject({err: 'DbService not initialized'});
  }

  DbService.init = function() {
    if (window.cordova) {
      document.addEventListener("deviceready", function() {
        db.sqlite = $window.sqlitePlugin.openDatabase({name: 'letterbox.db', createFromLocation: 1});
        db.isInitialized = true;
      }, false);
    }
  };

  DbService.addMessage = function(roomHash, sender, content, timeSent) {
    var deferred = $q.defer();
    checkInit(deferred);

    db.sqlite.transaction(function(tx) {
      tx.executeSql("INSERT INTO messages (roomHash, sender, content, timeSent) VALUES (?,?,?,?)", [roomHash, sender, content, timeSent], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  };

  DbService.markMessagesAsRead = function(roomHash, timeSent) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("UPDATE messages SET isRead=1 WHERE roomHash=? AND timeSent<=? ORDER BY timeSent DESC", [roomHash, timeSent], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  };

  DbService.getRoomMessages = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT * FROM messages WHERE roomHash=? ORDER BY timeSent DESC", [roomHash], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  };

  DbService.getUnreadCounts = function() {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT roomHash, COUNT(*) FROM messages GROUP BY roomHash, isRead HAVING isRead=0", [], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  }

  DbService.getLastestMessage = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT sender, content FROM messages WHERE roomHash=? ORDER BY timeSent DESC LIMIT 1", [roomHash], function(tx, res) {
        deferred.resolve(res.rows.item(0));
      });
    });
    return deferred.promise;
  };

  DbService.deleteRoomMessages = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("DELETE FROM messages WHERE roomHash=?", [roomHash], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  };

  return DbService;
});
