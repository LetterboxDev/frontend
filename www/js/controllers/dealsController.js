angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $stateParams,
                                  $ionicScrollDelegate,
                                  DealService) {
  var category = $stateParams.category;
  $scope.currentCategory = category;

  $scope.deals = [];
  $scope.hasReachedEnd = false;

  // Force share button to be disabled if navigating from the deals page
  DealService.showShare = false;

  var limit = 3;
  var offset = 0;

  $scope.loadDeals = function() {
    if ($scope.currentCategory === "Featured") {
      DealService.getFeaturedDeals(offset, limit).then($scope.appendDeals);
    } else {
      DealService.getDeals($scope.currentCategory, offset, limit).then($scope.appendDeals);
    }
  }

  $scope.appendDeals = function(deals) {
    for (var i = 0; i < limit; i++) {
      if (deals[i]) {
        $scope.deals.push(deals[i]);
        offset++;
      } else {
        $scope.hasReachedEnd = true;
      }
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

