angular.module('starter.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
  var cardTypes = [
    {
      title: '1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      title: '2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      title: '3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      title: '4',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      title: '5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 1);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
    console.log($scope.cards);
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    console.log('destroyed');
  };

  $scope.addCard = function() {
    var newCard = { title: 'New', content: 'New' };
    $scope.cards.push(angular.extend({}, newCard));
    console.log('card added');
  };
});

