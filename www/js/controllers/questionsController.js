angular.module('starter.controllers')

.controller('QuestionsCtrl', function($scope, backend) {
  $scope.closeQuestionModal = function() {
    $scope.$parent.modal.hide();
  };

  $scope.selectedAnswer = [];

  $scope.updateQuestionAnswer = function(choice, index) {
    $scope.cards[0].questions[index].answer = false;
    $scope.selectedAnswer[index] = 0;
    if (choice === 1) {
      $scope.selectedAnswer[index] = 1
      $scope.cards[0].questions[index].answer = true;
    }
  };

  $scope.submitQuestionAnswer = function() {
    if ($scope.selectedAnswer.length !== 5) {
      console.log('Error, fill in all answers first.');
    } else {
      backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
      $scope.closeQuestionModal();
    }
  };
});

