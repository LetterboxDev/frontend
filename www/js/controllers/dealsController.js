angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService,
                                  DealService) {

  $scope.currentCategory = DealCategoryService.currentCategory;

  $scope.$on('$ionicView.enter', function() {
    if ($scope.currentCategory === "Featured") {
      DealService.getFeaturedDeals().then(function(deals) {
        $scope.deals = deals;
      });
    } else {
      DealService.getDeals($scope.currentCategory).then(function(deals) {
        $scope.deals = deals;
      });
    }
  });

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

