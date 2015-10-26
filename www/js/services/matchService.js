angular.module('letterbox.services')

.service('MatchService', function($q, $ImageCacheFactory, backend, AuthService) {
  var MatchService = this;

  MatchService.previousId = '';

  MatchService.getMatch = function() {
    var deferred = $q.defer();
    if (AuthService.isRegistered()) {
      var distance = window.localStorage.getItem('distanceRadius') ? window.localStorage.getItem('distanceRadius') : 50;
      backend.getMatch(distance, MatchService.previousId).$promise
      .then(function(match) {
        if (match.code === 200) {
          $ImageCacheFactory.Cache([
            match.pictureMed
          ]).then(function() {
            MatchService.previousId = match.hashedId;
            deferred.resolve(match);
          }, function() {
            deferred.reject();
          });
        } else {
          deferred.reject();
        }
      }, function(err) {
        deferred.reject();
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  };
});
