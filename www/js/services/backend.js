angular.module('starter.services')
.service('backend', function($resource, $http) {
  var backend = {};
  var URL = '/backend';
  // var URL = 'http://localhost:8080';

  var authPath = '/auth';
  var renewPath = '/auth/renew'
  var userSelfPath = '/user/self';
  var otherUserPath = '/user/id/:userId';
  var updateLocationPath = '/user/location';
  var updateBioPath = '/user/bio';
  var updateGenderPath = '/user/gender';
  var matchPath = '/match';
  var questionsPath = '/questions';
  var oneQuestionPath = '/question';
  var roomsPath = '/rooms';

  function getToken() {
    return window.localStorage.getItem('token');
  }

  var auth = $resource(URL.concat(authPath), {}, {
    get: {
      method: 'GET'
    }
  });

  var renewToken = $resource(URL.concat(renewPath), {}, {
    get: {
      method: 'GET'
    }
  });

  var matchGetter = $resource(URL.concat(matchPath), {}, {
    get: {
      method: 'GET'
    }
  });

  var updateUserLocation = $resource(URL.concat(updateLocationPath), {}, {
    updateLocation: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var updateUserBio = $resource(URL.concat(updateBioPath), {}, {
    updateBio: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var updateGender = $resource(URL.concat(updateGenderPath), {}, {
    updateGender: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var questionsHandler = $resource(URL.concat(questionsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    },
    updateQuestions: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var singleQuestionGetter = $resource(URL.concat(oneQuestionPath), {}, {
    get: {
      method: 'GET'
    }
  });

  var roomsGetter = $resource(URL.concat(roomsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var otherUserGetter = $resource(URL.concat(otherUserPath), {}, {
    get: {
      method: 'GET'
    }
  });

  backend.auth = function(fbToken) {
    return auth.get({fb_token: fbToken});
  };

  backend.renewToken = function() {
    var token = getToken();
    return renewToken.get({letterbox_token: token});
  };

  backend.getMatch = function(maxDistance, previousId) {
    var token = getToken();
    return matchGetter.get({letterbox_token: token, maxDistance: maxDistance, previousId: previousId});
  };

  backend.updateUserLocation = function(latitude, longitude, successPromise) {
    var token = getToken();
    locationUpdater = new updateUserLocation();
    locationUpdater.token = token;
    locationUpdater.latitude = latitude;
    locationUpdater.longitude = longitude;
    return locationUpdater.$updateLocation(successPromise);
  };

  backend.updateUserBio = function(bio, successPromise, errorPromise) {
    var token = getToken();
    var bioUpdater = new updateUserBio();
    bioUpdater.token = token;
    bioUpdater.bio = bio;
    return bioUpdater.$updateBio(successPromise, errorPromise);
  };

  // Gender:           'male' or 'female'
  // GenderPreference: 'male' or 'female'
  backend.updateGender = function(gender, genderPreference, successPromise) {
    var token = getToken();
    genderUpdater = new updateGender();
    genderUpdater.token = token;
    genderUpdater.gender = gender;
    genderUpdater.genderPreference = genderPreference;
    return genderUpdater.$updateGender(successPromise);
  };

  backend.getRandomQuestions = function() {
    var token = getToken();
    return questionsHandler.get({letterbox_token: token});
  };

  backend.getOneRandomQuestion = function(currentIds) {
    var token = getToken();
    return singleQuestionGetter.get({letterbox_token: token, currentQuestionIds: currentIds});
  };

  backend.setQuestionsAndAnswers = function(questions, successPromise, errorPromise) {
    var token = getToken();
    var handler = new questionsHandler();
    handler.token = token;
    handler.questions = questions;
    return handler.$updateQuestions(successPromise, errorPromise);
  };

  backend.getRooms = function() {
    var token = getToken();
    return roomsGetter.get({letterbox_token: token});
  };

  backend.getOtherUser = function(userId) {
    var token = getToken();
    return otherUserGetter.get({userId: userId, letterbox_token: token});
  };

  return backend;
});
