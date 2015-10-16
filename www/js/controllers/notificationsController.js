angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, $state, NotificationsService, eventbus) {
  $scope.notifications = [];

  function refreshNotifications() {
    NotificationsService.getNotificationsList().then(function(notifications) {
      $scope.notifications = notifications;
    });
  }

  refreshNotifications();
  eventbus.registerListener('letterReceived', refreshNotifications);
});