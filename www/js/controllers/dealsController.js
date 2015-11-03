angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService) {
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

  $scope.currentCategory = DealCategoryService.currentCategory;

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

