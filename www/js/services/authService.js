angular.module('letterbox.services')

.service('AuthService', function($q,
                                 $ionicHistory,
                                 $cordovaFacebook,
                                 backend,
                                 eventbus,
                                 DbService,
                                 socket) {

  var AuthService = {};

  function saveDetails(res) {
    window.localStorage.setItem('token', res.letterbox_token);
    window.localStorage.setItem('firstName', res.user.firstName);
    window.localStorage.setItem('hashedId', res.user.hashedId);
    window.localStorage.setItem('isRegistered', res.user.isRegistered);
    window.localStorage.setItem('genderPreference', res.user.genderPreference);
    window.localStorage.setItem('perfectMatch', res.user.perfectMatch);
  }

  AuthService.authToken = function(fbToken) {
    var deferred = $q.defer();

    backend.auth(fbToken).$promise
    .then(function(success) {
      saveDetails(success);
      backend.updateVersion();
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
      backend.updateVersion();
      deferred.resolve();
    }, function(err) {
      AuthService.logout().then(function() {
        deferred.reject();
      });
    });

    return deferred.promise;
  };

  AuthService.isLoggedIn = function() {
    return window.localStorage.getItem('token') !== null && window.localStorage.getItem('token').length > 0;
  };

  AuthService.isRegistered = function() {
    return AuthService.isLoggedIn() && window.localStorage.getItem('isRegistered') === 'true';
  };

  AuthService.logout = function() {
    var deferred = $q.defer();

    backend.clearPushToken()
    .then(function() {
      $ionicHistory.clearCache().then(function() {
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('firstName', '');
        window.localStorage.setItem('hashedId', '');
        window.localStorage.setItem('isRegistered', '');
        window.localStorage.setItem('genderPreference', '');
        window.localStorage.setItem('perfectMatch', '');

        if (window.cordova) {
          $cordovaFacebook.logout();
        }

        socket.uninit();

        if (DbService.isInitialized()) {
          DbService.clearAll().then(function() {
            deferred.resolve();
          });
        } else {
          deferred.resolve();
        }
      });
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  AuthService.deactivateUser = function() {
    var deferred = $q.defer();
    backend.deactivateUser()
    .then(function() {
      AuthService.logout().then(deferred.resolve);
    }, deferred.reject);
    return deferred.promise;
  };

  return AuthService;
});
