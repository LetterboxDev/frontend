angular.module('letterbox.controllers')

.controller('NotificationsCtrl', function($scope, $state, $ionicModal, NotificationsService, eventbus, backend) {
  $scope.notifications = [];
  $scope.isLoading = false;

  function refreshNotifications() {
    $scope.isLoading = true;
    NotificationsService.getNotificationsList().then(function(notifications) {
      $scope.notifications = notifications;
      $scope.isLoading = false;
    });
  }

  eventbus.registerListener('letterReceived', refreshNotifications);
  $scope.$on("$ionicView.enter", function(scopes, states) {
    refreshNotifications();
  });

  $scope.selectNotification = function(notification) {
    notification.isRead = true;
    $scope.selectedLetter = notification;
    backend.markLetterAsRead(notification.id);
    $state.go('app.response', {responseId: notification.id});
  };
});
