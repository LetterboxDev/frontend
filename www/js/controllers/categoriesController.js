angular.module('letterbox.controllers')

.controller('CategoriesCtrl', function( $scope,
                                        $state,
                                        CategoryService) {
  $scope.isLoading = true;

  CategoryService.getCategories()
    .then(function(categories) {
      $scope.categories = categories;
      $scope.isLoading = false;
    });

  $scope.viewCategory = function(categoryTitle) {
    $state.go('app.deals', { category: categoryTitle });
  };

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  };
});

