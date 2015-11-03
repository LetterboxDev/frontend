angular.module('letterbox.services')

.service('DealCategoryService', function($q, backend) {
  var dealCategory = this;

  dealCategory.currentCategory = '';

  dealCategory.setCurrentCategory = function(category) {
    dealCategory.currentCategory = category;
  };

  dealCategory.getCategories = function() {
    var deferred = $q.defer();
    backend.getDealCategories().then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };
});

