angular.module('letterbox.services')

.service('DealShareService', function() {
  var DealShare = this;

  DealShare.currentRoomHash = '';

  DealShare.setCurrentRoomHash = function(roomHash) {
    DealShare.currentRoomHash = roomHash;
  };
});

