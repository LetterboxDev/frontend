angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService,
                                  DealService) {

  $scope.currentCategory = DealCategoryService.currentCategory;

  DealService.getDeals($scope.currentCategory).then(function(deals) {
    $scope.deals = deals;
  });

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

