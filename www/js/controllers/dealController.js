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

  $scope.$on("$ionicView.enter", function(scopes, states) {
    $scope.deal = DealService.currentDeal;
  });
});

