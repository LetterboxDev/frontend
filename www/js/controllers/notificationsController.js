angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, $state, NotificationsService) {
  $scope.notifications = [];

  NotificationsService.getNotificationsList().then(function(notifications) {
    $scope.notifications = notifications;
  });

  // navigation
  $scope.goHome = function() {
    $state.go('app.home');
  };
});