angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope, $state, $ionicHistory, backend, letterService, eventbus) {
  // Makes sure that cache is cleared after every time user submits/closes letter
  $scope.$on("$ionicView.afterLeave", function () {
    $ionicHistory.clearCache();
  });

  var targetUser = letterService.targetUserCard;

  var questions = targetUser.questions;
  if (!questions) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go('app.home');
  } else {
    var selected = [-1, -1, -1, -1, -1];

    $scope.curr = 0;
    $scope.max = questions.length - 1;
    $scope.card = letterService.targetUserCard;
    $scope.userName = targetUser.name;
    $scope.currentQuestion = targetUser.questions[0];
    $scope.warning = '';
  }

  $scope.nextQuestion = function() {
    $scope.warning = '';
    if (selected[$scope.curr] === -1) selected[$scope.curr] = $scope.selectedTab;

    if ($scope.curr === $scope.max && selected.length === 5 && selected.indexOf(-1) === -1) {
      updateQuestionAnswers(questions, selected);
      backend.sendALetter(targetUser.hashedId, questions);
      $scope.closeLetter();
      eventbus.call('closeLetter');
      return;
    } else if ($scope.curr === $scope.max) {
      $scope.warning = 'Please complete all answers.';
      return;
    }
    $scope.curr++;
    updateQuestionView($scope.curr, questions, selected);
  };

  $scope.prevQuestion = function() {
    $scope.warning = '';
    if ($scope.curr <= 0) return;
    if (selected[$scope.curr] === -1) selected[$scope.curr] = $scope.selectedTab;
    $scope.curr--;
    updateQuestionView($scope.curr, questions, selected);
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

