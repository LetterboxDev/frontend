angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope, backend, letterService) {
  var targetUser = letterService.targetUserCard;

  $scope.userName = targetUser.name;
  $scope.questions = targetUser.questions;

  $scope.submitQuestionAnswer = function() {
    backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
  };
});

