angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealService) {
  $scope.dealId = DealService.currentDealId;
  $scope.deal = {
    title: 'Carl\'s Jr 1-for-1',
    image: 'http://lorempixel.com/300/300',
    description: 'Best deal ever!',
    location: 'ION Orchard',
    expiry: '2015/05/21',
    provider: 'NUStyles'
  };
});

