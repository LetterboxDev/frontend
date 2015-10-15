angular.module('starter.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, backend) {
  var previousId = '';
  $scope.cards = [];

  // Initial card load - loads two cards
  for (var i=0; i<2; i++) {
    backend.getMatch(1000)
      .$promise
      .then(function(match) {
        previousId = match.hashedId;
        $scope.cards.push(createNewCard(match));
      });
  }

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

  angular.element(document).ready(function() {
    var foldedCard = new OriDomi('.partner-card', {
      hPanels: 5,
      ripple:  true,
      shading: false,
      perspective: 600,
      speed: 40000
    });

    foldedCard.stairs(0, 'top');
  });

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

