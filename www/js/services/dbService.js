angular.module('letterbox.services')

.service('DbService', function($q,
                               $window,
                               socket,
                               backend,
                               eventbus) {

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
        db.sqlite = $window.sqlitePlugin.openDatabase({name: 'letterbox.db', createFromLocation: 1});
        db.sqlite.transaction(function(tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS rooms (hash CHAR(32) PRIMARY KEY, userId CHAR(32) NOT NULL, userName VARCHAR(256) NOT NULL, thumbnail TEXT NOT NULL, profilePicture TEXT NOT NULL, createdAt DATETIME NOT NULL)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS messages (roomHash CHAR(32) NOT NULL REFERENCES rooms(hash), sender VARCHAR(256) NOT NULL, content TEXT NOT NULL, timeSent BIGINT NOT NULL, isRead BOOLEAN NOT NULL DEFAULT 0, type VARCHAR(256) NOT NULL DEFAULT \'message\', DealId INTEGER, PRIMARY KEY (roomHash, sender, timeSent))');
          db.isInitialized = true;
          eventbus.call('dbInitialized');
        });
      }, false);
    }
  };

  DbService.addRoom = function(roomHash, userHash, userFirstName, thumbnailPic, mediumPic, createdAt) {
    var deferred = $q.defer();
    checkInit(deferred);

    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT COUNT(*) AS cnt FROM rooms WHERE hash=?", [roomHash], function(tx, res) {
        if (!res.rows.item(0).cnt) {
          tx.executeSql("INSERT INTO rooms VALUES (?,?,?,?,?,?)", [roomHash, userHash, userFirstName, thumbnailPic, mediumPic, createdAt], function(tx, res) {
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

  DbService.addMessage = function(roomHash, sender, content, timeSent, type, dealId) {
    var deferred = $q.defer();
    checkInit(deferred);

    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT COUNT(*) AS cnt FROM messages WHERE roomHash=? AND sender=? AND content=? AND timeSent=?", [roomHash, sender, content, timeSent], function(tx, res) {
        if (!res.rows.item(0).cnt) {
          tx.executeSql("INSERT INTO messages (roomHash, sender, content, timeSent, type, DealId) VALUES (?,?,?,?,?,?)", [roomHash, sender, content, timeSent, type ? type : 'message', dealId ? dealId : null], function(tx, res) {
            deferred.resolve(res);
          });
        } else {
          deferred.reject({
            error: 'message already exists'
          });
        }
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

  DbService.getSingleRoom = function(roomHash) {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT * FROM rooms WHERE hash=?", [roomHash], function(tx, res) {
        if (res.rows.length > 0) {
          var row = res.rows.item(0);
          var room = {
            hash: row.hash,
            userId: row.userId,
            userName: row.userName,
            thumbnail: row.thumbnail,
            profilePicture: row.profilePicture,
            createdAt: row.createdAt,
            latestMessage: {}
          };
          tx.executeSql("SELECT * FROM messages WHERE roomHash=? ORDER BY timeSent DESC LIMIT 1", [roomHash], function(tx, res) {
            if (res.rows.length > 0) {
              var row = res.rows.item(0);
              room.latestMessage.sender = row.sender;
              room.latestMessage.content = row.content;
              room.latestMessage.timeSent = row.timeSent;
            }
            deferred.resolve(room);
          });
        } else {
          deferred.reject({
            error: 'room does not exist'
          });
        }
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
            profilePicture: row.profilePicture,
            createdAt: row.createdAt
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
        DbService.addRoom(room.hash, room.userId, room.userName, room.thumbnail, room.profilePicture, room.createdAt).then(function(success) {
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
      tx.executeSql("SELECT * FROM messages WHERE roomHash=? ORDER BY timeSent ASC", [roomHash], function(tx, res) {
        var messages = [];
        for (var i = 0; i < res.rows.length; i++) {
          var row = res.rows.item(i);
          messages.push({
            RoomHash: row.roomHash,
            content: row.content,
            timeSent: row.timeSent,
            sender: row.sender,
            type: row.type,
            DealId: row.DealId
          });
        }
        deferred.resolve(messages);
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

  DbService.getLatestTimeSent = function() {
    var deferred = $q.defer();
    checkInit(deferred);
    db.sqlite.transaction(function(tx) {
      tx.executeSql("SELECT MAX(timeSent) as maxtime FROM messages", [], function(tx, res) {
        if (res.rows.length > 0) {
          deferred.resolve(res.rows.item(0).maxtime);
        } else {
          deferred.resolve(0);
        }
      });
    });
    return deferred.promise;
  };

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

  DbService.clearAll = function() {
    var deferred = $q.defer();
    checkInit(deferred);
    if (DbService.isInitialized()) {
      db.sqlite.transaction(function(tx) {
        tx.executeSql("DELETE FROM messages", [], function(tx, res) {
          tx.executeSql("DELETE FROM rooms", [], function(tx, res) {
            deferred.resolve();
          });
        });
      });
    }
    return deferred.promise;
  }

  return DbService;
});
