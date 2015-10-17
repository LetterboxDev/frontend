angular.module('starter.services')

.service('DbService', function($q, $window, socket, backend, eventbus) {
  var db = {isInitialized: false};
  var DbService = {};

  function checkInit(deferred) {
    if (!DbService.isInitialized()) deferred.reject({err: 'DbService not initialized'});
  }

  DbService.isInitialized = function() {
    return db.isInitialized && typeof db.sqlite !== 'undefined';
  };

  DbService.init = function() {
    if (window.cordova) {
      document.addEventListener("deviceready", function() {
        db.sqlite = $window.sqlitePlugin.openDatabase({name: 'letterbox.db'});
        db.sqlite.transaction(function(tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS rooms (hash CHAR(32) PRIMARY KEY, userId CHAR(32) NOT NULL, userName VARCHAR(256) NOT NULL, thumbnail TEXT NOT NULL, profilePicture TEXT NOT NULL)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS messages (roomHash CHAR(32) NOT NULL REFERENCES rooms(hash), sender VARCHAR(256) NOT NULL, content TEXT NOT NULL, timeSent INT NOT NULL, isRead BOOLEAN NOT NULL DEFAULT 0, PRIMARY KEY (roomHash, sender, timeSent))');
          db.isInitialized = true;
        });
      }, false);
    }
  };

  DbService.addRoom = function(roomHash, userHash, userFirstName, thumbnailPic, mediumPic) {
    var deferred = $q.defer();
    checkInit(deferred);

    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT COUNT(*) AS cnt FROM rooms WHERE hash=?", [roomHash], function(tx, res) {
        if (!res.rows.item(0).cnt) {
          tx.executeSql("INSERT INTO rooms VALUES (?,?,?,?,?)", [roomHash, userHash, userFirstName, thumbnailPic, mediumPic], function(tx, res) {
            deferred.resolve(res);
          });
        } else {
          deferred.reject({
            error: 'room already exists'
          });
        }
      });
    });
    return deferred.promise;
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

  function getRoomsFromDb() {
    var deferred = $q.defer();
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT * FROM rooms", [], function(tx, res) {
        var rooms = [];
        for (var i = 0; i < res.rows.length; i++) {
          var row = res.rows.item(i);
          rooms.push({
            hash: row.hash,
            userId: row.userId,
            userName: row.userName,
            thumbnail: row.thumbnail,
            profilePicture: row.profilePicture
          });
        }
        deferred.resolve(rooms);
      });
    });
    return deferred.promise;
  }

  DbService.updateRooms = function() {
    backend.getRooms().$promise.then(function(rooms) {
      rooms.forEach(function(room) {
        DbService.addRoom(room.hash, room.userId, room.userName, room.thumbnail, room.profilePicture).then(function(success) {
          eventbus.call('roomsUpdated', rooms);
        });
      });
    });
  };

  DbService.getRooms = function() {
    var deferred = $q.defer();
    checkInit(deferred);
    if (socket.isConnected()) {// Is connected to Internet and backend is awake
      DbService.updateRooms();
    }
    getRoomsFromDb().then(deferred.resolve);
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
      tx.executeSql("SELECT roomHash, COUNT(*) as cnt FROM messages GROUP BY roomHash, isRead HAVING isRead=0", [], function(tx, res) {
        deferred.resolve(res);
      });
    });
    return deferred.promise;
  }

  DbService.getLastestMessage = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT sender, content, timeSent FROM messages WHERE roomHash=? ORDER BY timeSent DESC LIMIT 1", [roomHash], function(tx, res) {
        deferred.resolve(res.rows.item(0));
      });
    });
    return deferred.promise;
  };

  DbService.deleteRoom = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("DELETE FROM rooms WHERE hash=?", [roomHash], function(tx, res) {
        deferred.resolve(res);
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
