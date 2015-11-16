angular.module('letterbox.services')

.service('backend', function($q,
                             $resource,
                             $http,
                             VERSION) {

  var backend = {};
  var URL = 'http://ec2-52-74-138-177.ap-southeast-1.compute.amazonaws.com';
  // var URL = 'http://localhost:8080';

  var authPath = '/auth';
  var renewPath = '/auth/renew'
  var userSelfPath = '/user/self';
  var otherUserPath = '/user/id/:userId';
  var pushTokenPath = '/user/pushtoken';
  var perfectMatchPath = '/user/perfectmatch';
  var updateLocationPath = '/user/location';
  var updateBioPath = '/user/bio';
  var userPhotoPath = '/user/photo';
  var updateGenderPreferencePath = '/user/genderPreference';
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
  var reportPath = '/report';
  var getUserVersionPath = '/user/id/:hashedId/version';
  var setVersionPath = '/user/version';

  var featuredDealsPath = '/deal/featured';
  var dealCategoriesPath = '/deal/cat';
  var dealsByCatPath = '/deal/cat/:dealCat';
  var dealByIdPath = '/deal/id/:dealId';
  var userLikedDealsPath = '/deal/user/:otherUserId';
  var mutualLikedDealsPath = '/deal/mutual/:otherUserId';

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

  var userPhotoHandler = $resource(URL.concat(userPhotoPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    },
    setPhoto: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var userSelfGetter = $resource(URL.concat(userSelfPath), {}, {
    get: {
      method: 'GET'
    }
  });

  var pushTokenUpdater = $resource(URL.concat(pushTokenPath), {}, {
    updatePushToken: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    },
    clearPushToken: {
      method: 'DELETE',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var perfectMatchUpdater = $resource(URL.concat(perfectMatchPath), {}, {
    updatePerfectMatch: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
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

  var updateGenderPreference = $resource(URL.concat(updateGenderPreferencePath), {}, {
    updateGenderPreference: {
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
    },
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

  var reportHandler = $resource(URL.concat(reportPath), {}, {
    reportUser: {
      method: 'POST',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var featuredDealsHandler = $resource(URL.concat(featuredDealsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var dealCategoriesHandler = $resource(URL.concat(dealCategoriesPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var dealsByCatHandler = $resource(URL.concat(dealsByCatPath), {dealCat: '@dealCat'}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var dealByIdHandler = $resource(URL.concat(dealByIdPath), {dealId: '@dealId'}, {
    get: {
      method: 'GET'
    },
    likeDeal: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var userLikedDealsHandler = $resource(URL.concat(userLikedDealsPath), {otherUserId: '@otherUserId'}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var mutualLikedDealsHandler = $resource(URL.concat(mutualLikedDealsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  var otherUserVersionHandler = $resource(URL.concat(getUserVersionPath), {hashedId: '@hashedId'}, {
    get: {
      method: 'GET'
    }
  });

  var ownUserVersionHandler = $resource(URL.concat(setVersionPath), {}, {
    update: {
      method: 'PUT',
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

  backend.getMatch = function(maxDistance, clearPrevious, minAge, maxAge) {
    var token = getToken();
    return matchGetter.get({letterbox_token: token, maxDistance: maxDistance, clearPrevious: clearPrevious, minAge: minAge, maxAge: maxAge});
  };

  // limit is the max number of matches to return
  backend.getMatches = function(maxDistance, limit, previousId) {
    var token = getToken();
    return matchesGetter.get({letterbox_token: token, maxDistance: maxDistance, limit: limit, previousId: previousId});
  };

  backend.getUserSelf = function() {
    var token = getToken();
    return userSelfGetter.get({letterbox_token: token});
  };

  backend.updatePushToken = function(pushtoken) {
    var token = getToken();
    updater = new pushTokenUpdater();
    updater.token = token;
    updater.pushToken = pushtoken;
    return updater.$updatePushToken();
  };

  backend.clearPushToken = function() {
    var deferred = $q.defer();
    var token = getToken();
    updater = new pushTokenUpdater();
    updater.token = token;
    updater.$clearPushToken(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  backend.updatePerfectMatch = function(perfectMatch) {
    var token = getToken();
    updater = new perfectMatchUpdater();
    updater.token = token;
    updater.perfectMatch = perfectMatch;
    return updater.$updatePerfectMatch();
  };

  backend.updateUserLocation = function(latitude, longitude, successPromise) {
    var token = getToken();
    locationUpdater = new updateUserLocation();
    locationUpdater.token = token;
    locationUpdater.latitude = latitude;
    locationUpdater.longitude = longitude;
    return locationUpdater.$updateLocation(successPromise);
  };

  backend.getProfilePhotos = function() {
    var token = getToken();
    return userPhotoHandler.get({letterbox_token: token});
  }

  backend.setProfilePhoto = function(pictureId, successPromise, errorPromise) {
    var token = getToken();
    handler = new userPhotoHandler();
    handler.token = token;
    handler.id = pictureId;
    return handler.$setPhoto(successPromise, errorPromise);
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
    genderPreferenceUpdater = new updateGenderPreference();
    genderPreferenceUpdater.token = token;
    genderPreferenceUpdater.genderPreference = genderPreference;
    return genderPreferenceUpdater.$updateGenderPreference(successPromise);
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

  backend.reportUser = function(userId, reason, successPromise, errorPromise) {
    var token = getToken();
    handler = new reportHandler();
    handler.token = token;
    handler.userId = userId;
    handler.reason = reason;
    return handler.$reportUser(successPromise, errorPromise);
  };

  backend.getFeaturedDeals = function(offset, limit) {
    var deferred = $q.defer();
    featuredDealsHandler.get({letterbox_token: getToken(), offset: offset, limit: limit}).$promise.then(function(res) {
      var deals = [];
      res.forEach(function(deal) {
        deals.push(deal);
      });
      deferred.resolve(deals);
    }, deferred.reject);
    return deferred.promise;
  };

  backend.getDealCategories = function() {
    var deferred = $q.defer();
    dealCategoriesHandler.get({letterbox_token: getToken()}).$promise.then(function(res) {
      var cats = [];
      res.forEach(function(cat) {
        cats.push(cat);
      });
      deferred.resolve(cats);
    }, deferred.reject);
    return deferred.promise;
  };

  backend.getDealsByCat = function(category, offset, limit) {
    var deferred = $q.defer();
    dealsByCatHandler.get({letterbox_token: getToken(), dealCat: category, offset: offset, limit: limit}).$promise.then(function(res) {
      var deals = [];
      res.forEach(function(deal) {
        deals.push(deal);
      });
      deferred.resolve(deals);
    }, deferred.reject);
    return deferred.promise;
  };

  backend.getDealById = function(dealId) {
    var deferred = $q.defer();
    dealByIdHandler.get({letterbox_token: getToken(), dealId: dealId}).$promise.then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  backend.toggleDealLike = function(dealId) {
    var deferred = $q.defer();
    handler = new dealByIdHandler();
    handler.token = getToken();
    handler.$likeDeal({dealId: dealId}, deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  backend.getUserLikedDeals = function(userId) {
    var deferred = $q.defer();
    userLikedDealsHandler.get({letterbox_token: getToken(), otherUserId: userId}).$promise.then(function(res) {
      var deals = [];
      res.forEach(function(deal) {
        deals.push(deal);
      });
      deferred.resolve(deals);
    }, deferred.reject);
    return deferred.promise;
  };

  backend.getMutualLikedDeals = function(userId) {
    var deferred = $q.defer();
    mutualLikedDealsHandler.get({letterbox_token: getToken(), otherUserId: userId}).$promise.then(function(res) {
      var deals = [];
      res.forEach(function(deal) {
        deals.push(deal);
      });
      deferred.resolve(deals);
    }, deferred.reject);
    return deferred.promise;
  };

  backend.getOtherUserVersion = function(userId) {
    var deferred = $q.defer();
    otherUserVersionHandler.get({letterbox_token: getToken(), hashedId: userId}).$promise.then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  backend.updateVersion = function() {
    var deferred = $q.defer();
    handler = new ownUserVersionHandler();
    handler.token = getToken();
    handler.major = VERSION.major;
    handler.minor = VERSION.minor;
    handler.revision = VERSION.revision;
    handler.$update(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  return backend;
});
