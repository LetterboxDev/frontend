angular.module('letterbox.controllers')

.controller('ProfileCtrl', function($scope, profile, backend, eventbus) {
  $scope.profile = profile;
  $scope.selectOption = function(question, option) {
    var index = $scope.profile.questions.indexOf(question);
    question.answer = option;
    $scope.profile.questions[index] = question;
  }
});