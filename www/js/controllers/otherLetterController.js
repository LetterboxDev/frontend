angular.module('letterbox.controllers')

.controller('OtherLetterCtrl', function($scope,
                                        UserLetterService) {
  $scope.letter = UserLetterService.getCurrentLetter();
});
