angular.module('starter.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, backend) {
  var cardTypes = [
    {
      name: 'Jenny Ang',
      age: '21',
      location: '1km',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      profile_pic: 'http://semantic-ui.com/images/avatar/large/jenny.jpg'
    },
    {
      name: 'Russell Ho',
      age: '22',
      location: '3km',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      profile_pic: 'http://semantic-ui.com/images/avatar/large/stevie.jpg'
    },
    {
      name: 'Douche Koh',
      age: '13',
      location: '2km',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      profile_pic: 'http://semantic-ui.com/images/avatar/large/stevie.jpg'
    },
    {
      name: 'Semi Aunty',
      age: '24',
      location: '4km',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      profile_pic: 'http://semantic-ui.com/images/avatar/large/jenny.jpg'
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
    var newCard = {
      name: 'New Aunty',
      age: '24',
      location: '4km',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      profile_pic: 'http://semantic-ui.com/images/avatar/large/jenny.jpg'
    };
    $scope.cards.push(angular.extend({}, newCard));
    console.log('card added');
  };
});

