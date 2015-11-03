angular.module('letterbox.services')

.service('DealCategoryService', function() {
  var dealCategory = this;

  dealCategory.currentCategory = '';

  dealCategory.setCurrentCategory = function(category) {
    dealCategory.currentCategory = category;
  };
});

