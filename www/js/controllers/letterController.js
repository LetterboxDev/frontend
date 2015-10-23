angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope, $state, $ionicHistory, backend, letterService, eventbus) {
  // Makes sure that cache is cleared after every time user submits/closes letter
  $scope.$on("$ionicView.afterLeave", function () {
    $ionicHistory.clearCache();
  });

  var targetUser = letterService.targetUserCard;
  var questions = targetUser.questions;
  var curr = 0;
  var max = questions.length - 1;
  var selected = [-1, -1, -1, -1, -1];

  $scope.userName = targetUser.name;
  $scope.currentQuestion = targetUser.questions[0];

  $scope.nextQuestion = function() {
    if (curr === max) return;
    if (selected[curr] === -1) selected[curr] = $scope.selectedTab;
    if (curr === max && selected.length === 5 && selected.indexOf(-1) === -1) {
      updateQuestionAnswers(questions, selected);
      backend.sendALetter(targetUser.hashedId, questions);
      $scope.closeLetter();
      eventbus.call('closeLetter');
      return;
    }
    curr++;
    updateQuestionView(curr, questions, selected);
  };

  $scope.prevQuestion = function() {
    if (curr <= 0) return;
    if (selected[curr] === -1) selected[curr] = $scope.selectedTab;
    curr--;
    updateQuestionView(curr, questions, selected);
  };

  $scope.closeLetter = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true,
    });
    $state.go('app.home');
  };

  /**
   * Helper functions
   */

  // Removes active class from .left and .right
  function resetClass() {
    $scope.selectedTab = -1;
  }

  function updateQuestionView(curr, questions, selected) {
    resetClass();
    $scope.currentQuestion = questions[curr];
    $scope.selectedTab = selected[curr];
  }

  function updateQuestionAnswers(questions, answers) {
    questions.forEach(function(question, index) {
      question.answer = false;
      if (answers[index] === 1) {
        question.answer = true;
      }
    });
  }
});

