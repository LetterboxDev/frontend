angular.module('letterbox.controllers')

.controller('LikedDealsCtrl', function($scope,
                                       $rootScope,
                                       $state,
                                       DealService) {
  $scope.likedDeals = [];

  var fetchLikedDeals = function() {
    DealService.getOwnLikedDeals().then(function(deals) {
      $scope.likedDeals = deals;
    });
  };

  $scope.viewDeal = function(deal) {
    DealService.setCurrentDeal(deal);
    $state.go('app.deal');
  }

  fetchLikedDeals();
});

