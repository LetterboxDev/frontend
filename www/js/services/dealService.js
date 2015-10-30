angular.module('letterbox.services')

.service('DealService', function() {
  var deal = this;

  deal.currentDealCard = {};

  deal.setCurrentDeal = function(deal) {
    deal.currentDealCard = deal;
  };
});

