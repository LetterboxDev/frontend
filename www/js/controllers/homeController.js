angular.module('starter.controllers')

.controller('HomeCtrl', function($scope, TDCardDelegate) {
  $scope.cards = [
    {
      title: 'Hello',
      content: 'World!'
    },
    {
      title: 'Hello',
      content: 'World!'
    }
  ];
});

