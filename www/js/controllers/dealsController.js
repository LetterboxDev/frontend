angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService,
                                  DealService) {

  $scope.currentCategory = DealCategoryService.currentCategory;

  $scope.isLoading = true;
  if ($scope.currentCategory === "Featured") {
    DealService.getFeaturedDeals().then(function(deals) {
      $scope.deals = deals;
      $scope.isLoading = false;
    });
  } else {
    DealService.getDeals($scope.currentCategory).then(function(deals) {
      $scope.deals = deals;
      $scope.isLoading = false;
    });
  }
  
  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

