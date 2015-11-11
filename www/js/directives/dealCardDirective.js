angular.module('letterbox.directives')

.directive('dealCard', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {
      $scope.learnMore = function(deal) {
        $state.go('app.deal', { dealId: deal.id });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-card.html'
  };
});

