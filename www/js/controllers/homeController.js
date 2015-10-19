angular.module('letterbox.controllers')


.controller('HomeCtrl', function($scope, $state, $ionicHistory, NotificationsService) {
  $scope.numberOfNotifications = 0;

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  NotificationsService.getNumberOfNotifications()
    .then(function(numberOfNotifications) {
      $scope.numberOfNotifications = numberOfNotifications;
    });

  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

