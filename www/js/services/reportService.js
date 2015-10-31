angular.module('letterbox.services')

.service('ReportService', function($q, backend) {
  return {
    reportUser: function(userId, reason) {
      var deferred = $q.defer();
      backend.reportUser(userId, reason, deferred.resolve, deferred.reject);
      return deferred.promise;
    }
  };
});
