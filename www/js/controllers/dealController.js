angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealService) {
  $scope.dealId = DealService.currentDealId;

  $scope.$on("$ionicView.enter", function(scopes, states) {
    DealService.getDeal($scope.dealId).then(function(deal) {
      $scope.deal = deal;
    });
  });
});

