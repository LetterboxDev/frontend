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
    $state.go('app.deal', { dealId: deal.id });
  };

  // Ensure that deals get reloaded each time
  $scope.$on('$ionicView.enter', function() {
    fetchLikedDeals();
  });
});

