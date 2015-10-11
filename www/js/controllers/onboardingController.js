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
        } else {
          // error, something went wrong
        }
      });
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
      if (gender === 'male') {
        this.isMale = true;
        this.isFemale = false;
      } else {
        this.isMale = false;
        this.isFemale = true;
      }
      window.localStorage.setItem('gender', gender);
    }
  }

  $scope.selectGenderPref = function(gender) {
    if (gender === 'male' || gender === 'female') {
      if (gender === 'male') {
        this.likesMales = true;
        this.likesFemales = false;
      } else {
        this.likesMales = false;
        this.likesFemales = true;
      }
      window.localStorage.setItem('genderPref', gender);
    }
  }

  $scope.completeOnboardingStep1 = function() {
    if (!window.localStorage.getItem('gender') ||
        !window.localStorage.getItem('genderPref')) {
      // TODO handle error
    } else {
      $state.go('onboarding', {onboardStep: 2});
    }
  };


  // Onboarding step 2 logic

  $scope.getNewQn = function(qnNum) {
    // get new qn and replace the existing qn
  }

  $scope.completeOnboarding = function() {
    window.localStorage.setItem('isRegistered', 'true');
    $state.go('app.home');
  };
});