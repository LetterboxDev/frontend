angular.module('letterbox.controllers')

.controller('ResponseCtrl', function($scope, $state, $stateParams, NotificationsService) {

  function getNotification() {
    NotificationsService.getNotificationFromId($stateParams.responseId).then(function(notification) {
      $scope.response = notification;
    });
  }

  getNotification();

  $scope.rejectLetter = function(letter) {
    // rejects the letter and refresh notifs
    backend.rejectLetter(letter.id, function() {
      // $scope.closeLetterModal();
      // refreshNotifications();
    });
  };

  $scope.approveLetter = function(letter) {
    // approves letter, opens a chat and refresh notifs
    backend.approveLetter(letter.id, refreshNotifications);
    // $scope.closeLetterModal();
  };
});