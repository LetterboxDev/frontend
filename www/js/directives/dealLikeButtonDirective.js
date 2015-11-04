angular.module('letterbox.directives')

.directive('dealLikeBtn', function($document) {
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
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-like-button.html'
  };
});

