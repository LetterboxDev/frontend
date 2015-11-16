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
  $scope.isCardAnimating = false;
  $scope.letterClosed = false;
  $scope.requestingNumber = 0;

  eventbus.registerListener('changePreference', changePreference);
  eventbus.registerListener('closeLetter', closeLetter);
  eventbus.registerListener('enterHome', checkAndGetCard);

  getInitialCard();

  $scope.changeCard = function() {
    if ($scope.isCardAnimating) {
      return;
    }
    $scope.isCardAnimating = true;
    selectFirst('.profile-card').addClass('moving-out');

    $timeout(function() {
      // timeout for moving out animation
      selectFirst('.profile-card').removeClass('moving-out');
      $scope.isLoading = true;
      MatchService.getCard().then(function(card) {
        $scope.cards.splice(0, 1);
        $scope.cards.push(card);
        selectFirst('.profile-card').addClass('moving-in');
        $scope.isLoading = false;
        $scope.isCardAnimating = false;
        // timeout for remove moving in animation
        $timeout(function() {
          selectFirst('.profile-card').removeClass('moving-in');
        }, 500);
      }, function() {
        $scope.cards.splice(0, 1);
        $scope.isLoading = false;
        $scope.isCardAnimating = false;
      });
    }, 500);
  };

  $scope.openSendLetter = function(card) {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: false
    });
    letterService.setTargetUserCard(card);
    $state.go('app.letter');
  };

  /**
   * Helper functions
   */
  function checkAndGetCard() {
    if ($scope.letterClosed) {
      $scope.letterClosed = false;
      $scope.changeCard();
    }

    // if there is card currently loaded, change it
    // otherwise, load new card
    if ($scope.cards.length === 0) {
      getInitialCard();
    }
  }

  function changePreference() {
    if ($scope.cards.length === 0) {
      getInitialCard();
    } else {
      $scope.changeCard();
    }
  }

  function closeLetter() {
    $scope.letterClosed = true;
  }

  function getInitialCard() {
    if (window.localStorage.getItem('token') && !$scope.isLoading) {
      $scope.isLoading = true;
      MatchService.getCard().then(function(card) {
        $scope.isLoading = false;
        $scope.cards.push(card);
        $scope.isCardAnimating = true;
        $timeout(function() {
          selectFirst('.profile-card').removeClass('moving-in');
          $scope.isCardAnimating = false;
        }, 500);
      }, function() {
        $scope.isLoading = false;
      });
    }
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }
});

