angular.module('letterbox.services')

.service('ProfileService', function($q, backend) {
  return {
    getProfile: function() {
      var deferred = $q.defer();
      backend.getUserSelf().$promise.then(function(profile) {
        deferred.resolve(profile);
      });
      return deferred.promise;
    }
  }
});