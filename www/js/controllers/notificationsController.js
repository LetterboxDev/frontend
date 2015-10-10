angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, $state, NotificationsService) {
  $scope.notifications = NotificationsService.getNotificationsList();

  // navigation
  $scope.goHome = function() {
    $state.go('app.home');
  };
});