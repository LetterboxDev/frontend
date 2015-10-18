angular.module('letterbox.services')

.service('ProfileService', function($q, backend) {
  return {
    getProfile: function() {
      var deferred = $q.defer();
      backend.getUserSelf().$promise.then(function(profile) {
        deferred.resolve(profile);
      });
      return deferred.promise;
    },

    getNewQuestion: function(qnIds) {
      var deferred = $q.defer();
      backend.getOneRandomQuestion(qnIds).$promise.then(function(qn){
        deferred.resolve(qn);
      }, function(err){
        deferred.resolve(null);
      });
      return deferred.promise;
    }
  }
});