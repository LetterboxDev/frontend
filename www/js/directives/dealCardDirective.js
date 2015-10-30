angular.module('letterbox.directives')

.directive('dealCard', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope) {
      $scope.nextCard = function() {
        // TODO: hookup with backend
        console.log('Next card.');
      };

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

