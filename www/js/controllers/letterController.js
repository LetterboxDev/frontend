angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope, $state, $ionicHistory, backend, letterService) {
  var targetUser = letterService.targetUserCard;
  var questions = targetUser.questions;
  var curr = 0;
  var max = questions.length - 1;
  var selected = new Array(5);

  $scope.userName = targetUser.name;
  $scope.currentQuestion = targetUser.questions[0];

  $scope.nextQuestion = function() {
    if (curr >= max) return;
    if (selected[curr] == undefined) selected[curr] = $scope.selectedTab;
    curr++;
    updateQuestionView(curr, questions, selected);
  };

  $scope.prevQuestion = function() {
    if (curr <= 0) return;
    if (selected[curr] == undefined) selected[curr] = $scope.selectedTab;
    curr--;
    updateQuestionView(curr, questions, selected);
  };

  $scope.closeLetter = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true,
    });
    $state.go('app.home');
  };

  $scope.submitQuestionAnswer = function() {
    backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
  };

  /**
   * Helper functions
   */

  // Removes active class from .left and .right
  function resetClass() {
    $scope.selectedTab = undefined;
  }

  function updateQuestionView(curr, questions, selected) {
    resetClass();
    $scope.currentQuestion = questions[curr];
    $scope.selectedTab = selected[curr];
  }
});

