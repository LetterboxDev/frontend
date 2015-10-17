angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $ionicGesture, $ionicModal, $element, $timeout, backend) {
  var previousId = '';

  $scope.cards = [];

  backend.getMatch(1000)
    .$promise
    .then(function(match) {
      previousId = match.hashedId;
      $scope.cards.push(createNewCard(match));

      $timeout(function() {
        selectFirst('.partner-card').removeClass('moving-in');
        registerEventHandler();
      }, 400);
    });

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
          // timeout for moving out animation
          $scope.cards.splice(0, 1);

          $timeout(function() {
            // timeout for moving in animation
            selectFirst('.partner-card').removeClass('moving-in');
            registerEventHandler();
          }, 200);
        }, 200);
      });
  };

  // $ionicGesture.on('dragend', function(e){
  //   var st = window.getComputedStyle((document.getElementsByClassName("oridomi-panel"))[8], null);

  //   var tr = st.getPropertyValue("-webkit-transform") ||
  //            st.getPropertyValue("-moz-transform") ||
  //            st.getPropertyValue("-ms-transform") ||
  //            st.getPropertyValue("-o-transform") ||
  //            st.getPropertyValue("transform") ||
  //            "Either no transform set, or browser doesn't do getComputedStyle";

  //   var foldingIndex = (tr.split(','))[5];

  //   if (foldingIndex <= 0) {
  //     $scope.changeCard();
  //   } else {
  //     $scope.foldedCard.stairs(0, 'top');
  //   }
  // }, $element);

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
      questions: match.questions
    };
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }

  function registerEventHandler() {
    selectFirst('.button-reject').on('touch', function(e) {
      $scope.changeCard();
    });

    selectFirst('.button-answer').on('touch', function(e) {
      $scope.openQuestionModal();
    });
  }
});

