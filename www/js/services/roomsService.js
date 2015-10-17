angular.module('starter.services')
.service('RoomsService', function($q, backend, DbService, eventbus) {
  var RoomsService = {};
  var roomsCache = [];

  eventbus.registerListener('roomsUpdated', function(rooms) {
    roomsCache = rooms;
  });

  RoomsService.getRoom = function(hash) {
    for (var i = 0; i < roomsCache.length; i++) {
      if (roomsCache[i].hash === hash) return roomsCache[i];
    }
    return null;
  }

  RoomsService.updateRooms = function() {
    if (!window.cordova && !DbService.isInitialized()) {
      backend.getRooms().$promise.then(function(rooms) {
        var res = [];
        rooms.forEach(function(room) {
          res.push(room);
        })
        eventbus.call('roomsUpdated', res);
      });
    } else {
      DbService.getRooms().then(function(rooms) {
        eventbus.call('roomsUpdated', rooms);
      });
    }
  };

  return RoomsService;
});