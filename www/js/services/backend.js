angular.module('letterbox.services')
.service('backend', function($resource, $http) {
  var backend = {};
  var URL = 'https://getletterbox.com';
  // var URL = 'http://localhost:8080';

  var authPath = '/auth';
  var renewPath = '/auth/renew'
  var userSelfPath = '/user/self';
  var otherUserPath = '/user/id/:userId';
  var updateLocationPath = '/user/location';
  var updateBioPath = '/user/bio';
  var updateGenderPath = '/user/gender';
  var matchPath = '/match';
  var matchesPath = '/matches';
  var questionsPath = '/questions';
  var oneQuestionPath = '/question';
  var messagesPath = '/messages';
  var roomsPath = '/rooms';
  var oneRoomPath = '/room/:roomId';
  var roomMessagePath = '/rooms/:roomId';
  var lettersPath = '/letters';
  var singleLetterPath = '/letters/:letterId';

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

  var matchesGetter = $resource(URL.concat(matchesPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var userSelfGetter = $resource(URL.concat(userSelfPath), {}, {
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

  var messagesGetter = $resource(URL.concat(messagesPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var roomsGetter = $resource(URL.concat(roomsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var singleRoomGetter = $resource(URL.concat(oneRoomPath), {roomId: '@roomId'}, {
    get: {
      method: 'GET'
    }
  });

  var roomMessageGetter = $resource(URL.concat(roomMessagePath), {roomId: '@roomId'}, {
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

  var lettersHandler = $resource(URL.concat(lettersPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    },
    createLetter: {
      method: 'POST',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var singleLetterHandler = $resource(URL.concat(singleLetterPath), {letterId: '@letterId'}, {
    approveLetter: {
      method: 'POST',
      params: {
        letterbox_token: '@token'
      }
    },
    readLetter: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    },
    rejectLetter: {
      method: 'DELETE',
      params: {
        letterbox_token: '@token'
      }
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

  // limit is the max number of matches to return
  backend.getMatches = function(maxDistance, limit, previousId) {
    var token = getToken();
    return matchesGetter.get({letterbox_token: token, maxDistance: maxDistance, limit: limit, previousId: previousId});
  }

  backend.getUserSelf = function() {
    var token = getToken();
    return userSelfGetter.get({letterbox_token: token});
  }

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

  // GenderPreference: 'male' or 'female'
  backend.updateGenderPreference = function(genderPreference, successPromise) {
    var token = getToken();
    genderUpdater = new updateGender();
    genderUpdater.token = token;
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

  backend.getMessages = function(since) {
    var token = getToken();
    return messagesGetter.get({letterbox_token: token, since: since});
  };

  backend.getRooms = function() {
    var token = getToken();
    return roomsGetter.get({letterbox_token: token});
  };

  backend.getSingleRoom = function(roomHash) {
    var token = getToken();
    return singleRoomGetter.get({letterbox_token: token, roomId: roomHash})
  };

  backend.getRoomMessages = function(roomHash, since) {
    var token = getToken();
    return roomMessageGetter.get({letterbox_token: token, roomId: roomHash, since: since});
  };

  backend.getOtherUser = function(userId) {
    var token = getToken();
    return otherUserGetter.get({userId: userId, letterbox_token: token});
  };

  backend.getAllLetters = function() {
    var token = getToken();
    return lettersHandler.get({letterbox_token: token});
  };

  backend.sendALetter = function(recipient, questionsWithAnswers, successPromise, errorPromise) {
    var token = getToken();
    handler = new lettersHandler();
    handler.token = token;
    handler.recipient = recipient;
    handler.questions = questionsWithAnswers;
    return handler.$createLetter(successPromise, errorPromise);
  };

  backend.markLetterAsRead = function(letterHash, successPromise, errorPromise) {
    var token = getToken();
    handler = new singleLetterHandler();
    handler.token = token;
    handler.letterId = letterHash;
    return handler.$readLetter(successPromise, errorPromise);
  };

  backend.approveLetter = function(letterHash, successPromise, errorPromise) {
    var token = getToken();
    handler = new singleLetterHandler();
    handler.token = token;
    handler.letterId = letterHash;
    return handler.$approveLetter(successPromise, errorPromise);
  };

  backend.rejectLetter = function(letterHash, successPromise, errorPromise) {
    var token = getToken();
    handler = new singleLetterHandler();
    handler.token = token;
    handler.letterId = letterHash;
    return handler.$rejectLetter(successPromise, errorPromise);
  };

  return backend;
});
