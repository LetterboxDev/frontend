angular.module('starter.controllers')

.controller('OnboardingCtrl', function($scope, $state, $timeout, Facebook, $cordovaOauth, backend) {


  // Login logic

  $scope.authenticateToken = function(fbToken) {
    $scope.testing = 'fb_token: ' + fbToken;
    backend.auth(fbToken).$promise.then(function(success) {
      window.localStorage.setItem('token', success.letterbox_token);
      window.localStorage.setItem('firstName', success.user.firstName);
      window.localStorage.setItem('hashedId', success.user.hashedId);
      window.localStorage.setItem('isRegistered', success.user.isRegistered);
      $scope.beginOnboarding();
    }, function(error) {
      // error something went wrong
    });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
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

  $scope.selectGender = function(gender) {
    if (gender === 'male' || gender === 'female') {
      $scope.gender = gender;
      window.localStorage.setItem('gender', gender);
    }
  }

  $scope.selectGenderPref = function(gender) {
    if (gender === 'male' || gender === 'female') {
      $scope.genderPref = gender;
      window.localStorage.setItem('genderPref', gender);
    }
  }

  $scope.completeOnboardingStep1 = function() {
    var gender = window.localStorage.getItem('gender');
    var genderPref = window.localStorage.getItem('genderPref')
    if (gender && genderPref) {
      backend.updateGender(gender, genderPref, function(res){
        $state.go('onboarding', {onboardStep: 2});
      });
    } else {
      // TODO handle error
    }
  };


  // Onboarding step 2 logic

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

  $scope.completeOnboardingStep2 = function() {
    for (var i = 0; i < 5; i++) {
      if (typeof $scope.questions[i].answer === 'undefined') {
        //TODO handle error
        console.log('Answer all questions');
        return;
      }
    }
    
    var questions = $scope.questions.map(function(qn){ 
      return { id: qn.id, answer: qn.answer }
    });

    backend.setQuestionsAndAnswers(questions, function(res){
      $state.go('onboarding', {onboardStep: 3});
    }, function(err){
      console.log("Couldn't save question and answers");
    });
  }


  // Onboarding step 3 logic
  $scope.data = {
    bio: ""
  }

  $scope.onEnterText = function() {
    console.log($scope.data.bio);
  }

  $scope.completeOnboardingStep3 = function() {
    if ($scope.data.bio.length > 0) {
      //send to backend
      $scope.completeOnboarding();
    }
  }

  $scope.completeOnboarding = function() {
    window.localStorage.setItem('isRegistered', 'true');
    $state.go('app.home');
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