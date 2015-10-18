angular.module('letterbox.controllers')

.controller('ProfileCtrl', function($scope, profile, backend, eventbus) {
  $scope.profile = profile;
});