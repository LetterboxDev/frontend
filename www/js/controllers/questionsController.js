angular.module('letterbox.controllers')

.controller('QuestionsCtrl', function($scope, backend) {
  $scope.selectedAnswers = [];

  $scope.submitQuestionAnswer = function() {
    backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
  };
});

