angular.module('starter.controllers')

.controller('ChatCtrl', function($scope, recipient, messages) {
  $scope.recipient = recipient;
  $scope.messages = messages;
});