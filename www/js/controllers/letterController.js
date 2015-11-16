angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope,
                                   $state,
                                   $ionicHistory,
                                   $ionicPopup,
                                   backend,
                                   letterService,
                                   eventbus,
                                   $timeout) {

  // Makes sure that cache is cleared after every time user submits/closes letter
  $scope.$on("$ionicView.afterLeave", function () {
    $('.button-next').qtip('destroy');
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
    $scope.tooltipShown = false;
    $scope.selectedTab = -1;
  }

  $scope.nextQuestion = function() {
    $scope.warning = '';
    if (selected[$scope.curr] === -1) selected[$scope.curr] = $scope.selectedTab;

    if ($scope.curr === $scope.max && selected.length === 5 && selected.indexOf(-1) === -1) {
      removeTooltip();
      updateQuestionAnswers(questions, selected);
      backend.sendALetter(targetUser.hashedId, questions).then(function() {
        $ionicPopup.alert({
          title: "Letter sent.",
          cssClass: "popup-alert",
          okType: "button-positive",
          okText: "Home"
        }).then(function(res) {
          if (res) {
            $ionicHistory.goBack();
            eventbus.call('closeLetter');
          }
        });
      }, function() {
        $ionicPopup.alert({
          title: "Failed to send letter.",
          cssClass: "popup-alert",
          okType: "button-positive",
          okText: "Home"
        }).then(function(res) {
          if (res) {
            $ionicHistory.goBack();
            eventbus.call('closeLetter');
          }
        });
      });

      return;
    } else if ($scope.curr === $scope.max) {
      $scope.warning = 'Please answer all questions.';
      return;
    }
    $scope.curr++;
    updateQuestionView($scope.curr, questions, selected);
  };

  $scope.prevQuestion = function() {
    removeTooltip();
    $scope.warning = '';
    if ($scope.curr <= 0) return;
    if (selected[$scope.curr] === -1) selected[$scope.curr] = $scope.selectedTab;
    $scope.curr--;
    updateQuestionView($scope.curr, questions, selected);
  };

  $scope.selectTab = function(tab) {
    $scope.selectedTab = tab;

    if ($scope.curr < $scope.max) {
      $timeout(function() {
        $scope.nextQuestion();
      }, 200);
    }

    if ($scope.curr === $scope.max && !$scope.tooltipShown) {
      $('.button-next').qtip({
        content: 'Send the letter!',
        style: {
          classes: 'qtip-tipsy'
        },
        show: {
          when: false,
          ready: true
        },
        hide: false
      });
      $scope.tooltipShown = true;
    }
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

  function removeTooltip() {
    if ($scope.tooltipShown) {
        $('.button-next').qtip('destroy');
        $scope.tooltipShown = false;
    }
  }
});

