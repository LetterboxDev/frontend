angular.module('letterbox.controllers')

.controller('LetterCtrl', function($scope, $state, $ionicHistory, backend, letterService) {
  var targetUser = letterService.targetUserCard;

  $scope.userName = targetUser.name;

  $scope.currentQuestion = targetUser.questions[0];

  $scope.closeLetter = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true,
    });
    $state.go('app.home');
  };

  $scope.submitQuestionAnswer = function() {
    backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
  };
});

