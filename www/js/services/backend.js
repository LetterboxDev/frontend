angular.module('starter.services')
.service('backend', function($resource, $http) {
  var backend = {};
  var URL = 'http://ec2-52-74-138-177.ap-southeast-1.compute.amazonaws.com';

  var authPath = '/auth';
  var userSelfPath = '/user/self';
  var otherUserPath = '/user/id/:UserId';
  var questionsPath = '/questions';
  var roomsPath = '/rooms';

  var auth = $resource(URL.concat(authPath), {}, {
    get: {
      method: 'GET'
    }
  });

  backend.auth = function(fbToken) {
    return auth.get({fb_token: fbToken});
  };


  return backend;
});