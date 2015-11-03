angular.module('letterbox.controllers')

.controller('LikedDealsCtrl', function($scope,
                                          $rootScope,
                                          $state,
                                          DealService) {
  $scope.likedDeals = [
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    }
  ];
});

