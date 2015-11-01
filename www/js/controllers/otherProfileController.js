angular.module('letterbox.controllers')

.controller('OtherProfileCtrl', function($scope,
                                     $state,
                                     $stateParams,
                                     eventbus) {

  $scope.user = {};

  function fetchUser() {
    if ($stateParams.user) {
      $scope.user = $stateParams.user;
    }
  }
});

