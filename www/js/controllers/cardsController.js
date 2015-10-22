angular.module('letterbox.controllers')

.controller('CardsCtrl', function($scope, $ionicModal, $element, $timeout, backend, eventbus) {
  var previousId = '';
  $scope.cards = [];

  function getCard() {
    if (window.localStorage.getItem('token') && $scope.cards.length === 0) {
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
    }
  }

  eventbus.registerListener("enterHome", getCard);
  getCard();

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

    selectFirst('.button-positive').on('touch', function(e) {
      $scope.openQuestionModal();
    });
  }
});

