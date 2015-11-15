angular.module('letterbox.controllers')

.controller('OnboardingCtrl', function($scope,
                                       $state,
                                       $timeout,
                                       $ionicPopup,
                                       $ionicLoading,
                                       $ionicSlideBoxDelegate,
                                       $cordovaOauth,
                                       $ionicHistory,
                                       $cordovaInAppBrowser,
                                       $cordovaFacebook,
                                       Facebook,
                                       AuthService,
                                       backend,
                                       eventbus) {

  $scope.openTermsOfUse = function() {
    var ref = $cordovaInAppBrowser.open('http://getletterbox.com/terms', '_blank', {
      hardwareback: 'yes',
      zoom: 'no',
      closebuttoncaption: 'Close',
      toolbarposition: 'bottom'
    });
  };

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
        template: 'Please try again later',
        cssClass: "popup-alert"
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
        } else {
          $scope.hideLoading();
          var alertPopup = $ionicPopup.alert({
            title: 'An error when trying to login with Facebook!',
            template: 'Please try again later',
            cssClass: "popup-alert"
          });
        }
      }, {scope: 'public_profile,user_birthday,user_photos,user_friends', return_scopes: true});
    } else {
      $cordovaFacebook.login(["public_profile", "user_birthday", "user_photos", "user_friends"])
      .then(function(res) {
        $scope.authenticateToken(res.authResponse.accessToken);
      }, function(err) {
        $scope.hideLoading();
        var alertPopup = $ionicPopup.alert({
          title: 'An error when trying to login with Facebook!',
          template: 'Please try again later',
          cssClass: "popup-alert"
        });
      })
    }
  };

  $scope.beginOnboarding = function() {
    if (!AuthService.isRegistered()) {
      $state.go('onboarding', {onboardStep: 0});
    } else {
      $state.go('app.home');
    }
  };


  // Onboarding step 0 logic
  $scope.startOnboard = function(index) {
    $state.go('onboarding', {onboardStep: 1});
  };

  $scope.isAtStart = true;
  $scope.isAtEnd = false;

  $scope.slide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
    updateStartAndEndVars();
  };

  $scope.prevSlide = function() {
    $ionicSlideBoxDelegate.previous();
    updateStartAndEndVars();
  };

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    updateStartAndEndVars();
  };

  function updateStartAndEndVars() {
    var index = $ionicSlideBoxDelegate.currentIndex();
    if (index == 0) {
      $scope.isAtStart = true;
    } else if (index == $ionicSlideBoxDelegate.slidesCount() - 1) {
      $scope.isAtEnd = true;
    } else {
      $scope.isAtStart = false;
      $scope.isAtEnd = false;
    }
  }

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
      $scope.completeOnboarding();
    }, function(err){
      console.log("Couldn't save question and answers");
    });
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
    $ionicHistory.clearHistory();
    if (AuthService.isLoggedIn() && !$scope.questions) {
      $scope.getRandomQuestions();
    }
  }

  init();
});
