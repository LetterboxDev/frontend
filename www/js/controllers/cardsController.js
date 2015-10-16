angular.module('starter.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $ionicGesture, $ionicModal, $element, $timeout, backend) {
  var previousId = '';
  $scope.cards = [];

  // Initial card load - loads two cards
  // for (var i=0; i<2; i++) {
    backend.getMatch(1000)
      .$promise
      .then(function(match) {
        previousId = match.hashedId;
        $scope.cards.push(createNewCard(match));

        $timeout(function() {
          $scope.foldedCard = new OriDomi('.partner-card', {
            hPanels: 5,
            ripple:  true,
            shading: false,
            perspective: 600,
            speed: 200,
            maxAngle: 60
          });

          $scope.foldedCard.stairs(0, 'top');
        }, 200);
      });
  // }

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
        $scope.foldedCard = new OriDomi('.partner-card', {
          hPanels: 5,
          ripple:  true,
          shading: false,
          perspective: 600,
          speed: 400,
          maxAngle: 60
        });

        $scope.foldedCard.stairs(0, 'top');
      });
  };

  $ionicGesture.on('dragend', function(e){
    var el = (document.getElementsByClassName("oridomi-panel"))[8];

    var st = window.getComputedStyle(el, null);

    var tr = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "Either no transform set, or browser doesn't do getComputedStyle";

    var foldingIndex = (tr.split(','))[5];

    console.log(foldingIndex);

    if (foldingIndex <= 0) {
      console.log('die');
    } else {
      $scope.foldedCard.stairs(0, 'top');
    }
  }, $element);
  */

  /**
   * Modal Logic
   */
  $ionicModal.fromTemplateUrl('templates/question-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openQuestionModal = function() {
    console.log($scope.cards[0]);
    $scope.modal.show();
  };

  $scope.closeQuestionModal = function() {
    $scope.modal.hide();
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
      distance: match.distance,
      questions: match.questions
    };
  }
});

