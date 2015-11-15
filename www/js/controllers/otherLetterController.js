angular.module('letterbox.controllers')

.controller('OtherLetterCtrl', function($scope,
                                        $stateParams,
                                        RoomsService) {
  var roomHash = $stateParams.roomHash;
  RoomsService.getRoomLetter(roomHash).then(function(letter) {
    $scope.letter = letter;
  });
});
