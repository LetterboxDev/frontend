angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $sce,
                                  $ionicHistory,
                                  DealService) {

  $scope.dealShareButton = false;
  if ($ionicHistory.backView().stateName === 'app.chat') {
    $scope.dealShareButton = true;
  }

  $scope.shareDeal = function() {
    console.log('share deal');
  };

  $scope.dealId = DealService.currentDealId;

  DealService.getDeal($scope.dealId).then(function(deal) {
    $scope.deal = deal;
    $scope.deal.description = $sce.trustAsHtml($scope.deal.description);
  });
});

