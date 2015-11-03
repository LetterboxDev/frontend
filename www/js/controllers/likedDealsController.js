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

  fetchLikedDeals();
});

