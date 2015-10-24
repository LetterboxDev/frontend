angular.module('letterbox.controllers')

.controller('OnboardingCtrl', function($scope, $state, $timeout, $ionicPopup, $ionicLoading, Facebook, $cordovaOauth, AuthService, backend, eventbus) {

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  // Login logic
  $scope.authenticateToken = function(fbToken) {
    AuthService.authToken(fbToken).then(function(success) {
      eventbus.call('loginCompleted');
      $scope.hideLoading();
      $scope.beginOnboarding();
    }, function(err) {
      $scope.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'An error occurred!',
        template: 'Please try again later'
      });
    });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.showLoading();
    if (!window.cordova) {
      Facebook.login(function(response) {
        if (response.status === 'connected') {
          $scope.authenticateToken(response.authResponse.accessToken);
        }
      }, {scope: 'public_profile,user_birthday,user_education_history,user_work_history', return_scopes: true});
    } else {
      $cordovaOauth.facebook('1674828996062928', ['public_profile','user_birthday','user_education_history','user_work_history']).then(function(res) {
        $scope.authenticateToken(res.access_token);
      }, function(err) {
        // inform of error
      });
    }
  };

  $scope.beginOnboarding = function() {
    if (window.localStorage.getItem('token') &&
        window.localStorage.getItem('isRegistered') === 'false') {
      $state.go('onboarding', {onboardStep: 1});
    } else {
      $state.go('app.home');
    }
  };


  // Onboarding step 1 logic

  $scope.getRandomQuestions = function() {
    backend.getRandomQuestions().$promise.then(function(res){
      $scope.questions = res.splice(0,5);
    }, function(err){
      console.log("Couldn't retrive questions");
    });
  }

  $scope.getNewQn = function(question) {
    var qnIds = $scope.questions.map(function(qn){ return qn.id });
    backend.getOneRandomQuestion(qnIds).$promise.then(function(res){
      var index = $scope.questions.indexOf(question);
      $scope.questions[index] = res;
    }, function(err){
      console.log("Couldn't retrive new question");
    });
  }

  $scope.selectOption = function(question, option) {
    var index = $scope.questions.indexOf(question);
    question.answer = option;
    $scope.questions[index] = question;
  }

  $scope.completeOnboardingStep1 = function() {
    for (var i = 0; i < 5; i++) {
      if (typeof $scope.questions[i].answer === 'undefined') {
        showError("Please answer all your questions");
        return;
      }
    }

    var questions = $scope.questions.map(function(qn){
      return { id: qn.id, answer: qn.answer }
    });

    backend.setQuestionsAndAnswers(questions, function(res){
      $state.go('onboarding', {onboardStep: 2});
    }, function(err){
      console.log("Couldn't save question and answers");
    });
  }


  // Onboarding step 2 logic
  $scope.data = {
    bio: ""
  }

  $scope.onEnterText = function() {
    // console.log($scope.data.bio);
  }

  $scope.completeOnboardingStep2 = function() {
    if ($scope.data.bio.length > 0) {
      backend.updateUserBio($scope.data.bio, function(res){
        $scope.completeOnboarding();
      }, function(err){
        console.log("Couldn't save bio");
      });
    } else {
      showError("Please add a short bio");
    }
  }

  $scope.completeOnboarding = function() {
    window.localStorage.setItem('isRegistered', 'true');
    $state.go('app.home');
  }

  function showError(title) {
    $ionicPopup.alert({
      title: title,
      cssClass: "popup-alert",
      okType: "button-stable"
    }).then(function(res) {
    });  
  }

  var init = function() {
    if (window.localStorage.getItem('token') && !$scope.questions) {
      $scope.getRandomQuestions();
    }
    $scope.gender = window.localStorage.getItem('gender');
    $scope.genderPref = window.localStorage.getItem('genderPref');
  }

  init();
});
