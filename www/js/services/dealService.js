angular.module('letterbox.services')

.service('DealService', function($q, backend) {
  var deal = this;

  deal.currentDeal = {};
  deal.currentDealId = '';
  deal.showShare = false;

  deal.addDealThumbnail = function(dealObject) {
    var imgurImageSize = "b";
    var imageUrl = dealObject.images[0];
    var dotIndex = imageUrl.lastIndexOf('.');
    dealObject.thumbnail = imageUrl.substr(0, dotIndex) +
                          imgurImageSize +
                          imageUrl.substr(dotIndex);
  };

  deal.addThumbnailToDeals = function(deals) {
    var deferred = $q.defer();
    for (var i = 0; i < deals.length; i++) {
      deal.addDealThumbnail(deals[i]);
    }
    deferred.resolve(deals);
    return deferred.promise;
  };

  deal.setCurrentDeal = function(dealObject) {
    deal.currentDeal = dealObject;
  };

  deal.setCurrentDealId = function(dealId) {
    deal.currentDealId = dealId;
  };

  deal.getAllDeals = function() {
    return deal.getDeals('all');
  };

  deal.getDeals = function(category) {
    var deferred = $q.defer();
    backend.getDealsByCat(category).then(function(deals) {
      deal.addThumbnailToDeals(deals).then(deferred.resolve);
    }, deferred.reject);
    return deferred.promise;
  };

  deal.getFeaturedDeals = function() {
    var deferred = $q.defer();
    backend.getFeaturedDeals().then(function(deals) {
      deal.addThumbnailToDeals(deals).then(deferred.resolve);
    }, deferred.reject);
    return deferred.promise;
  };

  deal.getDeal = function(id) {
    var deferred = $q.defer();
    backend.getDealById(id).then(function(deal) {
      deal.addDealThumbnail(deal);
      deferred.resolve(deal);
    }, deferred.reject);
    return deferred.promise;
  };

  deal.toggleDealLike = function(id) {
    var deferred = $q.defer();
    backend.toggleDealLike(id).then(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  deal.getOwnLikedDeals = function() {
    var deferred = $q.defer();
    backend.getUserLikedDeals('self').then(function(deals) {
      deal.addThumbnailToDeals(deals).then(deferred.resolve);
    }, deferred.reject);
    return deferred.promise;
  };

  deal.getUserLikedDeals = function(userId) {
    var deferred = $q.defer();
    backend.getUserLikedDeals(userId).then(function(deals) {
      deal.addThumbnailToDeals(deals).then(deferred.resolve);
    }, deferred.reject);
    return deferred.promise;
  };

  deal.getMutualLikedDeals = function(userId) {
    var deferred = $q.defer();
    backend.getMutualLikedDeals(userId).then(function(deals) {
      deal.addThumbnailToDeals(deals).then(deferred.resolve);
    }, deferred.reject);
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
