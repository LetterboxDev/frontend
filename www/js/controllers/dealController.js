angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $sce,
                                  DealService) {
  $scope.dealId = DealService.currentDealId;

  $scope.$on("$ionicView.enter", function(scopes, states) {
    DealService.getDeal($scope.dealId).then(function(deal) {
      $scope.deal = deal;
      DealService.setCurrentDeal(deal);
      $scope.deal.description = $sce.trustAsHtml($scope.deal.description);
      // console.log($scope.deal);
    });
  });
});

