angular.module('starter.services')
.service('backend', function($resource, $http) {
  var backend = {};
  var URL = 'http://ec2-52-74-138-177.ap-southeast-1.compute.amazonaws.com';

  var authPath = '/auth';
  var renewPath = '/auth/renew'
  var userSelfPath = '/user/self';
  var otherUserPath = '/user/id/:UserId';
  var updateLocationPath = '/user/location';
  var updateGenderPath = '/user/gender';
  var matchPath = '/match';
  var questionsPath = '/questions';
  var roomsPath = '/rooms';

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

  var updateGender = $resource(URL.concat(updateGenderPath), {}, {
    update: {
      method: 'PUT',
      params: {
        letterbox_token: '@token'
      }
    }
  });

  var questionsGetter = $resource(URL.concat(questionsPath), {}, {
    get: {
      method: 'GET',
      isArray: true
    }
  });

  backend.auth = function(fbToken) {
    return auth.get({fb_token: fbToken});
  };

  backend.renewToken = function(token) {
    return renewToken.get({letterbox_token: token});
  };

  backend.getMatch = function(token, maxDistance) {
    return matchGetter.get({letterbox_token: token, maxDistance: maxDistance});
  }

  backend.updateUserLocation = function(token, latitude, longitude, successPromise) {
    locationUpdater = new updateUserLocation();
    locationUpdater.token = token;
    locationUpdater.latitude = latitude;
    locationUpdater.longitude = longitude;
    return locationUpdater.$updateLocation(successPromise);
  };

  // Gender:           'male' or 'female'
  // GenderPreference: 'male' or 'female'
  backend.updateGender = function(token, gender, genderPreference, successPromise) {
    genderUpdater = new updateGender();
    genderUpdater.token = token;
    genderUpdater.gender = gender;
    genderUpdater.genderPreference = genderPreference;
    return genderUpdater.$update(successPromise);
  };

  backend.getRandomQuestions = function(token) {
    return questionsGetter.get({letterbox_token: token});
  };

  return backend;
});