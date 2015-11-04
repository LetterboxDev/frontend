angular.module('letterbox.services')

.service('DealService', function($q, backend) {
  var deal = this;

  deal.currentDeal = {};

  deal.setCurrentDeal = function(deal) {
    deal.currentDeal = deal;
  };

  deal.getAllDeals = function() {
    return deal.getDeals('all');
  };

  deal.getDeals = function(category) {
    var deferred = $q.defer();
    backend.getDealsByCat(category).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getDeal = function(id) {
    var deferred = $q.defer();
    backend.getDealById(id).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.likeDeal = function(id) {
    var deferred = $q.defer();
    backend.likeDeal(id).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getOwnLikedDeals = function() {
    var deferred = $q.defer();
    backend.getUserLikedDeals('self').then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getUserLikedDeals = function(userId) {
    var deferred = $q.defer();
    backend.getUserLikedDeals(userId).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getMutualLikedDeals = function(userId) {
    var deferred = $q.defer();
    backend.getMutualLikedDeals(userId).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };
});
