angular.module('letterbox.services')

.service('DealService', function($q, backend) {
  var deal = this;

  deal.currentDeal = {};
  deal.currentDealId = '';
  deal.showShare = false;

  deal.setCurrentDeal = function(dealObject) {
    deal.currentDeal = dealObject;
  };

  deal.setCurrentDealId = function(dealId) {
    deal.currentDealId = dealId;
  };

  deal.getAllDeals = function(offset, limit) {
    return deal.getDeals('all', offset, limit);
  };

  deal.getDeals = function(category, offset, limit) {
    var deferred = $q.defer();
    backend.getDealsByCat(category, offset, limit).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getFeaturedDeals = function(offset, limit) {
    var deferred = $q.defer();
    backend.getFeaturedDeals(offset, limit).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getDeal = function(id) {
    var deferred = $q.defer();
    backend.getDealById(id).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.toggleDealLike = function(id) {
    var deferred = $q.defer();
    backend.toggleDealLike(id).then(deferred.resolve, deferred.reject);
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

  deal.checkDealCompatability = function(userId) {
    var deferred = $q.defer();
    backend.getOtherUserVersion(userId).then(function(version) {
      if (version.minor >= 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }, deferred.reject);
    return deferred.promise;
  };
});
