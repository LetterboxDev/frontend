angular.module('letterbox.controllers')


.controller('HomeCtrl', function($scope, $state, $ionicHistory, NotificationsService, eventbus) {
  $scope.numberOfNotifications = 0;

  $scope.$on('$ionicView.enter', function() {
    eventbus.call('enterHome')
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
  });

  NotificationsService.getNumberOfNotifications()
    .then(function(numberOfNotifications) {
      $scope.numberOfNotifications = numberOfNotifications;
    });

  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

