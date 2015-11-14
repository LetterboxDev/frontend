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

  var bufferSize = 5;

  $scope.cards = [];
  $scope.isLoading = false;

  eventbus.registerListener('enterHome', checkAndGetCard);
  eventbus.registerListener('changeGender', checkAndGetCard);

  eventbus.registerListener('closeLetter', removeTopCard);
  getInitialCards();

  $scope.changeCard = function() {
    $scope.addCard();

    selectFirst('.profile-card').removeClass('moving-in');
    selectFirst('.profile-card').addClass('moving-out');

    $timeout(function() {
      // timeout for moving out animation
      selectFirst('.profile-card').removeClass('moving-out');
      selectFirst('.profile-card').addClass('moving-in');
      $scope.cards.splice(0, 1);
      $timeout(function() {
        // timeout for moving in animation
        selectFirst('.profile-card').removeClass('moving-in');
      }, 200);
      $scope.isLoading = false;
    }, 200);
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
        MatchService.getMatch()
        .then(function(match) {
          $scope.isLoading = false;
          if (match) {
            $scope.cards.push(createNewCard(match));
          }
        }, function() {
          $scope.isLoading = false;
        });
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

