angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $ionicScrollDelegate,
                                  DealCategoryService,
                                  DealService) {
  $scope.currentCategory = DealCategoryService.currentCategory;
  $scope.deals = [];
  $scope.hasReachedEnd = false;

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

