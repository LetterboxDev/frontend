angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $state) {
  $scope.categories = [
    {
      title: 'Featured',
    },
    {
      title: 'Dining',
      image_url: '/img/category-images/dining.jpg'
    },
    {
      title: 'Entertainment',
      image_url: '/img/category-images/entertainment.jpg'
    },
    {
      title: 'Leisure',
      image_url: '/img/category-images/leisure.jpg'
    },
  ];

  $scope.deals = [
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    }
  ];

  $scope.viewCategory = function(categoryTitle) {
    console.log(categoryTitle);
  }
});

