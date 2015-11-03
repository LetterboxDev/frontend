angular.module('letterbox.controllers')

.controller('CategoriesCtrl', function( $scope,
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

  $scope.viewCategory = function(categoryTitle) {
    console.log(categoryTitle);
  }
});