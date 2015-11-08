angular.module('letterbox.directives')

.directive('dealLikeBtn', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {
      $scope.toggleLike = function() {
        $scope.ctrl.data.isLiked = !$scope.ctrl.data.isLiked;
        if ($scope.ctrl.data.isLiked) {
          $scope.ctrl.data.likeCount++;
        } else {
          $scope.ctrl.data.likeCount--;
        }
        DealService.toggleDealLike($scope.ctrl.data.id);
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-like-button.html'
  };
});

