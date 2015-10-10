angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope) {
  $scope.notifications = [
    { id: 1, from: 'Helen Heng', profile_pic: "http://semantic-ui.com/images/avatar/large/helen.jpg", message: "answered your questions, click here to see her responses", timestamp: "1h"},
  ];
});