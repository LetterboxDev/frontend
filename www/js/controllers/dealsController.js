angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $state) {
  $scope.deal = {
    title: '1-for-1 at Carl\'s Jr',
    image_url: 'http://lorempixel.com/250/250',
    description: 'This is the best deal ever!'
  };
});

