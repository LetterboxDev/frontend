angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope, $ionicScrollDelegate, $ionicGesture, $ionicModal, $element, $timeout, backend) {
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

  $ionicGesture.on('dragend', function(e) {
    var draggedDistance = $ionicScrollDelegate.getScrollPosition().top;

    if (draggedDistance >= 200) {
      $scope.changeCard();
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

