angular.module('letterbox.directives')

.directive('dealCard', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope) {
      $scope.favoriteCard = function() {
        // TODO: hookup with backend
        console.log('Favorite card.');
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-card.html'
  };
});

