angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealService) {
  $scope.dealId = DealService.currentDealId;
  console.log('dealId', $scope.dealId);
});

