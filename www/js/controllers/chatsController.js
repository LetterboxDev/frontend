angular.module('starter.controllers')

.controller('ChatsCtrl', function($scope) {
  $scope.chats = [
    { from: 'Person 1', id: 1 },
    { from: 'Person 2', id: 2 },
    { from: 'Person 3', id: 3 },
  ];
});

