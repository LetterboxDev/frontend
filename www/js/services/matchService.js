angular.module('letterbox.services')

.service('MatchService', function($q,
                                  $ImageCacheFactory,
                                  $timeout,
                                  $rootScope,
                                  backend,
                                  AuthService) {

  var MatchService = this;
  var maleMatches = [];
  var femaleMatches = [];
  var outstandingRequests = 0;
  var isMaleInit = false;
  var isFemaleInit = false;

  var MAX_BUFFER = 20;
  var REQUEST_INTERVAL = 800;
  var INITIAL_REQUESTS = 4;

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

  MatchService.getInitialMatch = function() {
    var deferred = $q.defer();
    var totalCompleted = 0;
    var resolved = false;
    var seen = [];
    var matches = window.localStorage.getItem('genderPreference') === 'male' ? maleMatches : femaleMatches;
    if (window.localStorage.getItem('genderPreference') === 'male') {
      isMaleInit = true;
    } else {
      isFemaleInit = true;
    }
    if (outstandingRequests === 0 && matches.length && AuthService.isRegistered()) {
      var match = matches.shift();
      deferred.resolve(match);
    } else if (AuthService.isRegistered()) {
      for (var i = 0; i < MAX_BUFFER; i++) {
        $timeout(function() {
          outstandingRequests++;
          MatchService.getMatch().then(function(match) {
            outstandingRequests--;
            totalCompleted++;
            if (seen.indexOf(match.hashedId) === -1) {
              seen.push(match.hashedId);
              matches.push(match);
            }
            if (totalCompleted >= INITIAL_REQUESTS && matches.length && !resolved) {
              resolved = true;
              deferred.resolve(matches.shift());
            } else if (totalCompleted >= INITIAL_REQUESTS && !matches.length && !resolved) {
              resolved = true;
              deferred.reject();
            }
          }, function() {
            outstandingRequests--;
            totalCompleted++;
            if (totalCompleted >= INITIAL_REQUESTS && matches.length && !resolved) {
              resolved = true;
              deferred.resolve(matches.shift());
            } else {
              resolved = true;
              deferred.reject();
            }
          });
        }, i * REQUEST_INTERVAL);
      }
    } else {
      deferred.reject();
    }
    return deferred.promise;
  };

  MatchService.getNextMatch = function() {
    var deferred = $q.defer();
    var matches = window.localStorage.getItem('genderPreference') === 'male' ? maleMatches : femaleMatches;
    if (matches.length) {
      var match = matches.shift();
      outstandingRequests++;
      MatchService.getMatch().then(function(matchedUser) {
        outstandingRequests--;
        matches.push(matchedUser);
      }, function() {
        outstandingRequests--;
      });
      deferred.resolve(match);
    } else if (outstandingRequests) {
      $rootScope.$watch(function() {
        return outstandingRequests;
      }, function(newValue, oldValue) {
        if (newValue === 0 && oldValue > 0) {
          if (matches.length) {
            outstandingRequests++;
            MatchService.getMatch().then(function(matchedUser) {
              outstandingRequests--;
              matches.push(matchedUser);
            }, function() {
              outstandingRequests--;
            });
            deferred.resolve(match);
          } else {
            deferred.reject();
          }
        }
      });
    } else {
      MatchService.getMatch().then(function(matchedUser) {
        deferred.resolve(match);
      }, function() {
        deferred.reject();
      })
    }
    return deferred.promise;
  }

  MatchService.getCard = function() {
    var deferred = $q.defer();
    if (window.localStorage.getItem('genderPreference') === 'male') {
      if (!isMaleInit) {
        MatchService.getInitialMatch().then(function(match) {
          if (typeof match === 'undefined') {
            deferred.resolve(MatchService.getCard());
          } else {
            deferred.resolve(createNewCard(match));
          }
        }, deferred.reject);
      } else {
        MatchService.getNextMatch().then(function(match) {
          if (typeof match === 'undefined') {
            deferred.resolve(MatchService.getCard());
          } else {
            deferred.resolve(createNewCard(match));
          }
        }, deferred.reject);
      }
    } else {
      if (!isFemaleInit) {
        MatchService.getInitialMatch().then(function(match) {
          if (typeof match === 'undefined') {
            deferred.resolve(MatchService.getCard());
          } else {
            deferred.resolve(createNewCard(match));
          }
        }, deferred.reject);
      } else {
        MatchService.getNextMatch().then(function(match) {
          if (typeof match === 'undefined') {
            deferred.resolve(MatchService.getCard());
          } else {
            deferred.resolve(createNewCard(match));
          }
        }, deferred.reject);
      }
    }
    return deferred.promise;
  };

  function createNewCard(match) {
    return {
      hashedId: match.hashedId,
      name: match.firstName,
      age: match.age,
      location: Math.floor(match.distance) + 'km',
      bio: match.bio,
      profile_pic: match.pictureMed,
      questions: match.questions,
      mutual_friends_count: (typeof match.mutualFriends === 'undefined') ? 'unknown' : match.mutualFriends.summary.total_count,
      likedDeals: match.likedDeals
    };
  }
});
