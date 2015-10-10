angular.module('starter.controllers')


.controller('HomeCtrl', function($scope, $state) {
  // navigation
  $scope.goChat = function() {
    $state.go('app.chats');
  };
});

