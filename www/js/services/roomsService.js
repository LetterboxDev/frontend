angular.module('starter.services')
.service('RoomsService', function($q, backend, DbService) {
  var RoomsService = {};

  RoomsService.getRooms = function() {
    var deferred = $q.defer();
    if (!window.cordova && !DbService.isInitialized()) {
      backend.getRooms().$promise.then(function(rooms) {
        var res = [];
        rooms.forEach(function(room) {
          res.push(room);
        })
        deferred.resolve(res);
      });
    } else {
      DbService.getRooms().then(deferred.resolve);
    }
    return deferred.promise;
  };

  return RoomsService;
});
