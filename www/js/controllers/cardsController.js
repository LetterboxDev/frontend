angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope, $state, $element, $timeout, $ionicHistory, backend, letterService) {
  var previousId = '';
  $scope.cards = [];

  backend.getMatch(1000)
    .$promise
    .then(function(match) {
      previousId = match.hashedId;
      $scope.cards.push(createNewCard(match));

      $timeout(function() {
        selectFirst('.profile-card').removeClass('moving-in');
        registerEventHandler();
      }, 400);
    });

  $scope.changeCard = function() {
    selectFirst('.profile-card').addClass('moving-out');
    $timeout($scope.addCard, 100);
  };

  $scope.addCard = function() {
    backend.getMatch(1000, previousId)
      .$promise
      .then(function(match) {
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
        }, 200);
      });
  };

  /**
   * Helper functions
   */
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
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });
      letterService.setTargetUserCard($scope.cards[0]);
      $state.go('app.letter');
    });
  }
});

