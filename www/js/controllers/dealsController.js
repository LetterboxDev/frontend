angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService,
                                  DealService) {
  $scope.deals = [
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    },
    {
      id: '1234',
      title: '1-for-1 at Carl\'s Jr',
      image_url: 'http://lorempixel.com/250/250',
      description: 'This is the best deal ever!'
    }
  ];

  $scope.currentCategory = DealCategoryService.currentCategory;

  // $scope.$on("$ionicView.enter", function(scopes, states) {
  //   $scope.deals = [];
  //   DealService.getDeals($scope.currentCategory).then(function(deals) {
  //     $scope.deals = deals;
  //   });
  // });

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

