angular.module('letterbox.controllers')

.controller('ProfileCtrl', function($scope, profile, backend, ProfileService, eventbus) {
  $scope.profile = profile;
  console.log(profile);

  $scope.getNewQn = function(oldQn) {
    var qnIds = $scope.profile.questions.map(function(qn){ return qn.id });
    ProfileService.getNewQuestion(qnIds).then(function(qn) {
      var index = $scope.profile.questions.indexOf(oldQn);
      $scope.profile.questions[index] = qn;
    })
  }

  $scope.selectOption = function(question, option) {
    var index = $scope.profile.questions.indexOf(question);
    question.answer = option;
    $scope.profile.questions[index] = question;
  }

  $scope.onEnterText = function() {
    // console.log($scope.data.bio);
  }

  $scope.updateProfile = function() {
    
  }
});