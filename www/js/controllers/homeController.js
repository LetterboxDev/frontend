angular.module('letterbox.controllers')


.controller('HomeCtrl', function($scope, $state, NotificationsService) {
  $scope.numberOfNotifications = NotificationsService.getNumberOfNotifications();

  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

