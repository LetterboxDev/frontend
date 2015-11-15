angular.module('letterbox.directives')

.directive('profilePicSmall', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope, $ionicModal) {
      $scope.showProfilePic = function() {
        $ionicModal.fromTemplateUrl('templates/profile-pic-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/profile-pic-small.html'
  };
});

