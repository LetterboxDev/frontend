angular.module('letterbox.controllers')

.controller('CategoriesCtrl', function( $scope,
                                        $state,
                                        DealCategoryService) {
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
    DealCategoryService.setCurrentCategory(categoryTitle);
    $state.go('app.deals');
  };

  $scope.viewFavorite = function() {
    $state.go('app.favorite-deals');
  };
});

