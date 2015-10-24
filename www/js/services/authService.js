angular.module('letterbox.services')

.service('AuthService', function($q, backend, DbService) {
  var AuthService = {};

  function saveDetails = function(res) {
    window.localStorage.setItem('token', res.letterbox_token);
    window.localStorage.setItem('firstName', res.user.firstName);
    window.localStorage.setItem('hashedId', res.user.hashedId);
    window.localStorage.setItem('isRegistered', res.user.isRegistered);
  };

  AuthService.authToken = function(fbToken) {
    var deferred = $q.defer();

    backend.auth(fbToken).$promise
    .then(function(success) {
      saveDetails(success);
      deferred.resolve();
    }, function(error) {
      deferred.reject();
    });

    return deferred.promise;
  };

  AuthService.renewToken = function() {
    var deferred = $q.defer();

    backend.renewToken().$promise
    .then(function(success) {
      saveDetails(success);
      deferred.resolve();
    }, function(err) {
      AuthService.logout().then(function() {
        deferred.reject();        
      });
    });

    return deferred.promise;
  };

  AuthService.logout = function() {
    var deferred = $q.defer();

    window.localStorage.setItem('token', '');
    window.localStorage.setItem('firstName', '');
    window.localStorage.setItem('hashedId', '');
    window.localStorage.setItem('isRegistered', '');

    DbService.clearAll().then(function() {
      deferred.resolve();
    });

    return deferred.promise;
  };

  return AuthService;
});
