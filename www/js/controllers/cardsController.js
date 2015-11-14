angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope,
                                  $state,
                                  $element,
                                  $timeout,
                                  $ImageCacheFactory,
                                  $ionicHistory,
                                  eventbus,
                                  backend,
                                  letterService,
                                  MatchService,
                                  ReportService) {

  var bufferSize = 20;

  $scope.cards = [];
  $scope.isLoading = false;
  $scope.requestingNumber = 0;

  eventbus.registerListener('enterHome', checkAndGetCard);
  eventbus.registerListener('changeGender', checkAndGetCard);
  // eventbus.registerListener('closeLetter', removeTopCard);

  getInitialCards();

  $scope.changeCard = function() {
    if ($scope.requestingNumber === 0) {
      $scope.addCard();
    }

    selectFirst('.profile-card').addClass('moving-out');

    $timeout(function() {
      // timeout for moving out animation
      selectFirst('.profile-card').removeClass('moving-out');
      selectFirst('.profile-card').addClass('moving-in');
      $scope.cards.splice(0, 1);
      $scope.isLoading = false;

      // timeout for remove moving in animation
      $timeout(function() {
        selectFirst('.profile-card').removeClass('moving-in');
      }, 500);

    }, 500);
  };

  $scope.openSendLetter = function(card) {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: false
    });
    letterService.setTargetUserCard(card);
    $state.go('app.letter');
  };

  $scope.addCard = function() {
    if (!$scope.isLoading) {
      MatchService.getMatch()
      .then(function(match) {
        $scope.cards.push(createNewCard(match));
      });
    }
  };

  /**
   * Helper functions
   */
  function checkAndGetCard() {
    // if there is card currently loaded, change it
    // otherwise, load new card
    if ($scope.cards.length === 0) {
      getInitialCards();
    } else {
      $scope.changeCard();
    }
  }

  function getInitialCards() {
    if (window.localStorage.getItem('token') && !$scope.isLoading) {
      $scope.isLoading = true;

      for (i = 0; i < bufferSize; i ++) {
        $scope.requestingNumber ++;
        // avoid concurrency issue
        $timeout(function() {
          MatchService.getMatch()
          .then(function(match) {
            $scope.requestingNumber --;

            if ($scope.cards.length === 2) {
              // temp hack
              $scope.isLoading = false;
              $timeout(function() {
                selectFirst('.profile-card').removeClass('moving-in');
              }, 500);
            }

            if (match) {
              var duplicatedMatch = false;

              $scope.cards.forEach(function(matched) {
                if (matched.hashedId === match.hashedId) {
                  duplicatedMatch = true;
                }
              });

              if (!duplicatedMatch) {
                $scope.cards.push(createNewCard(match));
              }
            }

          }, function() {
            $scope.isLoading = false;
          });
        }, i * 800);
      }
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
      mutual_friends_count: (typeof match.mutualFriends === 'undefined') ? 'unknown' : match.mutualFriends.summary.total_count,
      likedDeals: match.likedDeals
    };
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }
});

