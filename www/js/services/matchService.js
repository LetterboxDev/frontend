angular.module('letterbox.services')

.service('MatchService', function($q,
                                  $ImageCacheFactory,
                                  backend,
                                  AuthService) {

  var MatchService = this;

  MatchService.previousId = '';

  MatchService.getMatch = function() {
    var deferred = $q.defer();
    if (AuthService.isRegistered()) {
      var distance = window.localStorage.getItem('distanceRadius') ? window.localStorage.getItem('distanceRadius') : 50;
      var minAge = window.localStorage.getItem('minAge') ? window.localStorage.getItem('minAge') : 18;
      var maxAge = window.localStorage.getItem('maxAge') ? window.localStorage.getItem('maxAge') : 80;
      backend.getMatch(distance, MatchService.previousId, minAge, maxAge).$promise
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
