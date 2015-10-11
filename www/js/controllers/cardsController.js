angular.module('starter.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, backend) {
  var cards = [];
  var previousId = '';

  // Initial card load
  backend.getMatch(1000)
    .$promise
    .then(function(match) {
      previousId = match.hashedId;
      cards.push(createNewCard(match));
      $scope.cards = cards;
      $state.reload();
    });

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    backend.getMatch(1000, previousId)
      .$promise
      .then(function(match) {
        previousId = match.hashedId;
        $scope.cards.push(createNewCard(match));
      });
  };

  /**
   * Helper functions
   */
  function createNewCard(match) {
    return {
      name: match.firstName,
      age: match.age,
      location: match.location,
      bio: match.bio,
      profile_pic: match.pictureMed,
      distance: match.distance
    };
  }
});

