angular.module('letterbox.controllers')

.controller('ProfileCtrl', function($scope,
                                    $state,
                                    $ionicHistory,
                                    $ionicPopup,
                                    $ionicLoading,
                                    $ionicModal,
                                    ProfileService) {

  $scope.profile = {};
  $scope.isLoading = true;
  $scope.profilePhotos = [];
  $scope.isLoadingPhotos = false;

  $scope.$on("$ionicView.enter", function(scopes, states) {
    ProfileService.getProfile().then(function(profile) {
      $scope.profile = profile;
      $scope.isLoading = false;
    })
  });

  $ionicModal.fromTemplateUrl('templates/photo-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.openProfilePhotoModal = function() {
    $scope.isLoadingPhotos = true;
    $scope.modal.show();
    ProfileService.getProfilePictures()
    .then(function(photos) {
      $scope.profilePhotos = photos;
      $scope.isLoadingPhotos = false;
    }, function(err) {
      $scope.isLoadingPhotos = false;
    });
  };

  $scope.updateProfilePhoto = function(id) {
    $scope.hideProfilePhotoModal();
    $scope.showLoading();
    ProfileService.updateProfilePicture(id)
    .then(function(success) {
      $scope.profile.pictureMed = success.pictureMed;
      $scope.profile.pictureThumb = success.pictureThumb;
      $scope.hideLoading();
    }, function(err) {
      $scope.hideLoading();
    });
  };

  $scope.hideProfilePhotoModal = function() {
    $scope.modal.hide();
  };

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
      showError(errors.join(" & "));
    } else {
      showSuccess();
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

  function showError(title) {
    $ionicPopup.alert({
      title: title,
      cssClass: "popup-alert",
      okType: "button-stable"
    }).then(function(res) {
    });
  }

  function showSuccess() {
    $ionicPopup.confirm({
      title: "Your profile has been updated!",
      cssClass: "popup-alert",
      okType: "button-positive",
      okText: "Home"
    }).then(function(res) {
      if (res) {
        $state.go('app.home');
      }
    });
  }

});
