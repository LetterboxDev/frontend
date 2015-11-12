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

  $scope.cards = [];
  $scope.isLoading = false;

  eventbus.registerListener('enterHome', getCard);
  eventbus.registerListener('closeLetter', removeTopCard);
  eventbus.registerListener('changeGender', checkAndGetCard);
  getCard();

  $scope.changeCard = function() {
    selectFirst('.profile-card').addClass('moving-out');
    $timeout($scope.addCard, 100);
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
      $scope.isLoading = true;
      MatchService.getMatch()
      .then(function(match) {
        $scope.cards.push(createNewCard(match));
        $timeout(function() {
          // timeout for moving out animation
          $scope.cards.splice(0, 1);
          $timeout(function() {
            // timeout for moving in animation
            selectFirst('.profile-card').removeClass('moving-in');
          }, 200);
          $scope.isLoading = false;
        }, 200);
      }, function() {
        $scope.isLoading = false;
        $scope.cards.splice(0, 1);
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
      getCard();
    } else {
      $scope.changeCard();
    }
  }

  function getCard() {
    if (window.localStorage.getItem('token') && $scope.cards.length === 0 && !$scope.isLoading) {
      $scope.isLoading = true;
      MatchService.getMatch()
      .then(function(match) {
        $scope.isLoading = false;
        if (match) {
          $scope.cards.push(createNewCard(match));
          $timeout(function() {
            selectFirst('.profile-card').removeClass('moving-in');
          }, 400);
        }
      }, function() {
        $scope.isLoading = false;
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
      mutual_friends_count: (typeof match.mutualFriends === 'undefined') ? 'unknown' : match.mutualFriends.summary.total_count,
      likedDeals: match.likedDeals
    };
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }
});

