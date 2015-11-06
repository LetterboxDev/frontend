angular.module('letterbox.directives')

.directive('dealLikeBtn', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $state, DealService) {
      
      $scope.dealId = $scope.ctrl.data.dealId;
      $scope.isLiked = $scope.ctrl.data.isLiked;
      $scope.likeCount = $scope.ctrl.data.likeCount;
      
      console.log("like count");
      console.log($scope.dealId);
      console.log($scope.likeCount);

      $scope.toggleLike = function() {
        $scope.isLiked = !$scope.isLiked;
        if ($scope.isLiked) {
          $scope.likeCount++;
        } else {
          $scope.likeCount--;
        }


        DealService.toggleDealLike($scope.dealId);

        console.log('Favorite card.');
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/deal-like-button.html'
  };
});

