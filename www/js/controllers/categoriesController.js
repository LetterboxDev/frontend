angular.module('letterbox.controllers')

.controller('CategoriesCtrl', function( $scope,
                                        $state,
                                        DealCategoryService) {
  DealCategoryService.getCategories()
    .then(function(categories) {
      $scope.categories = categories;
    });

  $scope.viewCategory = function(categoryTitle) {
    DealCategoryService.setCurrentCategory(categoryTitle);
    $state.go('app.deals');
  };

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  };
});

