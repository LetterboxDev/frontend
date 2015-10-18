angular.module('letterbox.controllers')

.controller('NotificationsCtrl', function($scope, $state, $ionicModal, NotificationsService, eventbus, backend) {
  $scope.notifications = [];

  function refreshNotifications() {
    NotificationsService.getNotificationsList().then(function(notifications) {
      $scope.notifications = notifications;
    });
  }

  refreshNotifications();
  eventbus.registerListener('letterReceived', refreshNotifications);

  // $ionicModal.fromTemplateUrl('templates/letter-modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  $scope.selectNotification = function(notification) {
    notification.isRead = true;
    $scope.selectedLetter = notification;
    backend.markLetterAsRead(notification.id);
    $state.go('app.response', {responseId: notification.id});
  };
  
  // $scope.closeLetterModal = function() {
  //   $scope.modal.hide();
  // };

  // $scope.rejectLetter = function(letter) {
  //   // rejects the letter and refresh notifs
  //   backend.rejectLetter(letter.id, function() {
  //     $scope.closeLetterModal();
  //     refreshNotifications();
  //   });
  // };

  // $scope.approveLetter = function(letter) {
  //   // approves letter, opens a chat and refresh notifs
  //   backend.approveLetter(letter.id, refreshNotifications);
  //   $scope.closeLetterModal();
  // };
});