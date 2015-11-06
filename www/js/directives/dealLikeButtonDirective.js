angular.module('letterbox.directives')

.directive('dealLikeBtn', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {

      $scope.dealId = this.data.dealId;
      $scope.isLiked = this.data.isLiked;
      $scope.likeCount = this.data.likeCount;

      $scope.$watch('ctrl.data', function(newVal, oldVal) {
        $scope.dealId = newVal.dealId;
        $scope.isLiked = newVal.isLiked;
        $scope.likeCount = newVal.likeCount;
      });

      $scope.toggleLike = function() {
        $scope.isLiked = !$scope.isLiked;
        if ($scope.isLiked) {
          $scope.likeCount++;
        } else {
          $scope.likeCount--;
        }
        DealService.toggleDealLike($scope.dealId);
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-like-button.html'
  };
});

