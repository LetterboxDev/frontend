angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $stateParams,
                                  $state,
                                  $sce,
                                  $ionicHistory,
                                  $ionicModal,
                                  $ionicScrollDelegate,
                                  $ionicSlideBoxDelegate,
                                  socket,
                                  DealService,
                                  ChatService) {

  // Loads deal
  var dealId = $stateParams.dealId;
  DealService.getDeal(dealId).then(function(deal) {
    $scope.deal = deal;
  });

  $scope.dealShareButton = DealService.showShare;

  $scope.shareDeal = function() {
    var roomHash = $stateParams.roomHash;
    socket.shareDeal(roomHash, $scope.deal.title, $scope.deal.id);
    $ionicHistory.goBack(-1);
  };

  $scope.zoomMin = 1;

  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $ionicModal.fromTemplateUrl('templates/deal-images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.slide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };

  $scope.updateSlideStatus = function(slide) { // ensures you cannot switch pictures when zoomed in
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

  $scope.openLink = function(link) {
    window.open(link, '_system');
  };
});

