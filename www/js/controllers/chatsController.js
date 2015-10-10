angular.module('starter.controllers')

.controller('ChatsCtrl', function($scope, $state, NotificationsService) {
  $scope.chats = [
    { id: 1, from: 'Cassandra Ong', profile_pic: "http://semantic-ui.com/images/avatar/large/jenny.jpg", last_message: "Hello!", last_activity: "1h"},
    { id: 2, from: 'Michelle Lee', profile_pic: "http://semantic-ui.com/images/avatar/large/stevie.jpg", last_message: "Ok great! See you later!", last_activity: "2h"},
  ];

  $scope.numberOfNotifications = NotificationsService.getNumberOfNotifications();

  // navigation
  $scope.goNotifications = function() {
    $state.go('app.notifications');
  };
});

