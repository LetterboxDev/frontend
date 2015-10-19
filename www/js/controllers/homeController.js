angular.module('letterbox.controllers')


.controller('HomeCtrl', function($scope, $state, NotificationsService) {
  NotificationsService.getNumberOfNotifications()
    .then(function(numberOfNotifications) {
      $scope.numberOfNotifications = numberOfNotifications;
    });

  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

