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
  $scope.clearingPrevious = false;
  $scope.isCardAnimating = false;
  $scope.letterClosed = false;
  $scope.requestingNumber = 0;

  eventbus.registerListener('changePreference', changePreference);
  eventbus.registerListener('closeLetter', closeLetter);
  eventbus.registerListener('enterHome', checkAndGetCard);

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
      MatchService.getCard(false).then(function(card) {
        changeCardSuccess(card);
      }, function() {
        $scope.clearingPrevious = true;
        MatchService.getCard(true).then(function(card) {
          $scope.clearingPrevious = false;
          changeCardSuccess(card);
        }, function() {
          $scope.clearingPrevious = false;
          changeCardFail();
        });
      });
    }, 500);
  };

  function changeCardSuccess(card) {
    $scope.cards.splice(0, 1);
    $scope.cards.push(card);
    selectFirst('.profile-card').addClass('moving-in');
    $scope.isLoading = false;
    $scope.isCardAnimating = false;
    // timeout for remove moving in animation
    $timeout(function() {
      selectFirst('.profile-card').removeClass('moving-in');
    }, 500);
  }

  function changeCardFail() {
    $scope.cards.splice(0, 1);
    $scope.isLoading = false;
    $scope.isCardAnimating = false;
  }

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
      MatchService.getCard(false).then(function(card) {
        getInitialCardSuccess(card);
      }, function() {
        $scope.clearingPrevious = true;
        MatchService.getCard(true).then(function(card) {
          $scope.clearingPrevious = false;
          getInitialCardSuccess(card);
        }, function() {
          $scope.clearingPrevious = false;
          getInitialCardFail();
        });
      });
    }
  }

  function getInitialCardSuccess(card) {
    $scope.isLoading = false;
    $scope.cards.push(card);
    $scope.isCardAnimating = true;
    $timeout(function() {
      selectFirst('.profile-card').removeClass('moving-in');
      $scope.isCardAnimating = false;
    }, 500);
  }

  function getInitialCardFail() {
    $scope.isLoading = false;
  }

  function selectFirst(selector) {
    return angular.element($element[0].querySelectorAll(selector));
  }
});

