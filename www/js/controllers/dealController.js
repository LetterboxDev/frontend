angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $sce,
                                  $ionicHistory,
                                  $ionicModal,
                                  $ionicScrollDelegate,
                                  $ionicSlideBoxDelegate,
                                  socket,
                                  DealService,
                                  ChatService,
                                  DealShareService) {

  $scope.deal = DealService.currentDeal;

  $scope.dealShareButton = DealService.showShare;

  $scope.shareDeal = function() {
    var roomHash = DealShareService.currentRoomHash;
    socket.shareDeal(roomHash, $scope.deal.title, $scope.deal.id);
    $state.go('app.chat', { chatId: roomHash });
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

