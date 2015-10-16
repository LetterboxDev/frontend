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
          selectFirst('.partner-card').removeClass('moving-in');

          $scope.foldedCard = new OriDomi('.partner-card', {
            hPanels: 5,
            ripple:  true,
            shading: false,
            perspective: 600,
            speed: 400,
            maxAngle: 60,
            gapNudge: 0
          });

          $scope.foldedCard.stairs(0, 'top');

          registerEventHandler();
        }, 500);
      });
  // }

  $scope.changeCard = function() {
    selectFirst('.partner-card').addClass('moving-out');
    $timeout($scope.addCard, 100);
  };

  $scope.addCard = function() {
    backend.getMatch(1000, previousId)
      .$promise
      .then(function(match) {
        previousId = match.hashedId;
        $scope.cards.push(createNewCard(match));
        $timeout(function() {
          $scope.cards.splice(0, 1);

          $timeout(function() {
            $scope.foldedCard = new OriDomi('.partner-card.moving-in', {
              hPanels: 5,
              ripple:  true,
              shading: false,
              perspective: 600,
              speed: 400,
              maxAngle: 60,
              gapNudge: 0
            });

            $scope.foldedCard.stairs(0, 'top');
            selectFirst('.partner-card').removeClass('moving-in');

            registerEventHandler();
          }, 200);
        }, 500);
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
      $scope.changeCard();
    } else {
      $scope.foldedCard.stairs(0, 'top');
    }
  }, $element);

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
    $scope.modal.show();
  };

  $scope.closeQuestionModal = function() {
    $scope.modal.hide();
  };

  $scope.selectedAnswer = [];

  $scope.updateQuestionAnswer = function(choice, index) {
    $scope.cards[0].questions[index].answer = false;
    $scope.selectedAnswer[index] = 0;
    if (choice === 1) {
      $scope.selectedAnswer[index] = 1
      $scope.cards[0].questions[index].answer = true;
    }
  };

  $scope.submitQuestionAnswer = function() {
    if ($scope.selectedAnswer.length !== 5) {
      console.log('Error, fill in all answers first.');
    } else {
      backend.sendALetter($scope.cards[0].hashedId, $scope.cards[0].questions);
      $scope.closeQuestionModal();
    }
  };

  /**
   * Helper functions
   */
  function createNewCard(match) {
    return {
      hashedId: match.hashedId,
      name: match.firstName,
      age: match.age,
      location: match.location,
      bio: match.bio,
      profile_pic: match.pictureMed,
      distance: match.distance,
      questions: match.questions
    };
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }

  function registerEventHandler() {
    selectFirst('.button-flip').on('touch', function(e) {
      selectFirst('.flipper-container').toggleClass('hover');
    });

    selectFirst('.button-reject').on('touch', function(e) {
      $scope.changeCard();
    });

    selectFirst('.button-answer').on('touch', function(e) {
      $scope.openQuestionModal();
    });
  }
});

