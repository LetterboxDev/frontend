angular.module('letterbox.controllers')

.controller('ProfileCtrl', function($scope, profile, ProfileService, $ionicPopup) {
  $scope.profile = profile;

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
    var errors = [];

    if (isBioValid()) {
      ProfileService.updateBio($scope.profile.bio);
    } else {
      errors.push("Please enter a bio");
    }

    if (hasAnsweredAllQuestions()) {
      var questions = $scope.profile.questions.map(function(qn){
        return { id: qn.id, answer: qn.answer }
      });

      ProfileService.updateQuestions(questions);
    } else {
      errors.push("Please answer all questions");
    }

    if (errors.length > 0) {
      showAlert(errors.join(" & "));
    }
  }

  function isBioValid() {
    return $scope.profile.bio.length > 0;
  }

  function hasAnsweredAllQuestions() {
    for (var i = 0; i < 5; i++) {
      if (typeof $scope.profile.questions[i].answer === 'undefined') {
        return false;
      }
    }
    return true;
  }

  function showAlert(title) {
    $ionicPopup.alert({
      title: title,
      cssClass: "profile-update-error",
      okType: "button-stable"
    }).then(function(res) {
    });  
  }
  

});