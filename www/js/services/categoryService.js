angular.module('letterbox.services')

.service('CategoryService', function($q, backend) {
  var category = this;

  category.getCategories = function() {
    var deferred = $q.defer();
    backend.getDealCategories().then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };
});

