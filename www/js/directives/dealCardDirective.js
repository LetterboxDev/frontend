angular.module('letterbox.directives')

.directive('dealCard', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {
      $scope.liked = false;
      $scope.favoriteCard = function() {
        // TODO: hookup with backend
        $scope.liked = !$scope.liked;
        console.log('Favorite card.');
      };
      $scope.learnMore = function(dealId) {
        DealService.setCurrentDealId(dealId);
        $state.go('app.deal');
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-card.html'
  };
});

