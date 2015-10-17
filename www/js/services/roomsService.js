angular.module('letterbox.services')
.service('RoomsService', function($q, backend, DbService, eventbus) {
  var RoomsService = {};

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
