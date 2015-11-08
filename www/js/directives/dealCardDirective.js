angular.module('letterbox.directives')

.directive('dealCard', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {
      var imgurImageSize = "b";
      var imageUrl = $scope.ctrl.data.images[0];
      var dotIndex = imageUrl.lastIndexOf('.');
      $scope.smallImage = imageUrl.substr(0, dotIndex) + 
                          imgurImageSize + 
                          imageUrl.substr(dotIndex);

      $scope.learnMore = function(deal) {
        DealService.setCurrentDeal(deal);
        $state.go('app.deal');
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-card.html'
  };
});

