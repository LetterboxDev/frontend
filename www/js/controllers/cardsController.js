angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope, $state, $element, $timeout, $ImageCacheFactory, $ionicLoading, eventbus, backend, letterService) {
  var previousId = '';
  $scope.cards = [];
  $scope.isLoading = false;

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>',
      noBackdrop: true
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  eventbus.registerListener('enterHome', getCard);
  eventbus.registerListener('closeLetter', removeTopCard);
  getCard();

  $scope.changeCard = function() {
    selectFirst('.profile-card').addClass('moving-out');
    $timeout($scope.addCard, 100);
  };

  $scope.addCard = function() {
    var distance = window.localStorage.getItem('distanceRadius') ? window.localStorage.getItem('distanceRadius') : 50;
    if (!$scope.isLoading) {
      $scope.isLoading = true;
      $scope.showLoading();
      backend.getMatch(distance, previousId)
        .$promise
        .then(function(match) {
          $ImageCacheFactory.Cache([
                match.pictureMed
              ]).then(function() {
                previousId = match.hashedId;

                $scope.cards.push(createNewCard(match));
                $timeout(function() {
                  // timeout for moving out animation
                  $scope.cards.splice(0, 1);

                  $timeout(function() {
                    // timeout for moving in animation
                    selectFirst('.profile-card').removeClass('moving-in');
                    registerEventHandler();
                  }, 200);
                  $scope.isLoading = false;
                  $scope.hideLoading();
                }, 200);
              }, function() {
                $scope.isLoading = false;
                $scope.hideLoading();
              });
        }, function(err) {
          // TODO Show error message (no match, not connected, etc.)
        });
    }
  };

  /**
   * Helper functions
   */
  function getCard() {
    if (window.localStorage.getItem('token') && $scope.cards.length === 0 && !$scope.isLoading) {
      $scope.isLoading = true;
      $scope.showLoading();
      var distance = window.localStorage.getItem('distanceRadius') ? window.localStorage.getItem('distanceRadius') : 50;
      backend.getMatch(distance)
        .$promise
        .then(function(match) {
          $ImageCacheFactory.Cache([
              match.pictureMed
            ]).then(function() {
              previousId = match.hashedId;
              $scope.cards.push(createNewCard(match));

              $timeout(function() {
                selectFirst('.profile-card').removeClass('moving-in');
                registerEventHandler();
              }, 400);
              $scope.isLoading = false;
              $scope.hideLoading();
            }, function() {
              // Failed to load image
              $scope.isLoading = false;
              $scope.hideLoading();
            });
        }, function(err) {
          // TODO Show error message (no match, not connected, etc.)
        });
    }
  }

  function removeTopCard() {
    $scope.cards.shift();
  }

  function createNewCard(match) {
    return {
      hashedId: match.hashedId,
      name: match.firstName,
      age: match.age,
      location: Math.floor(match.distance) + 'km',
      bio: match.bio,
      profile_pic: match.pictureMed,
      questions: match.questions,
      mutual_friends_count: (typeof match.mutualFriends === 'undefined') ? 'unknown' : match.mutualFriends.summary.total_count
    };
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }

  function registerEventHandler() {
    selectFirst('.button-negative').on('touch', function(e) {
      $scope.changeCard();
    });

    // Goes to composing a new letter
    selectFirst('.button-positive').on('touch', function(e) {
      letterService.setTargetUserCard($scope.cards[0]);
      $state.go('app.letter');
    });
  }
});

