angular.module('starter.controllers')

.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
})

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
  var cardTypes = [
    {
      title: 'Hello',
      content: 'World!'
    },
    {
      title: 'Hello',
      content: 'World!'
    },
    {
      title: 'Hello',
      content: 'World!'
    },
    {
      title: 'Hello',
      content: 'World!'
    },
    {
      title: 'Hello',
      content: 'World!'
    }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 1);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = { title: 'New', content: 'New' };
    $scope.cards.push(angular.extend({}, newCard));
  };
});

