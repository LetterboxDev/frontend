angular.module('letterbox.controllers')

.controller('DealCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  $sce,
                                  $ionicHistory,
                                  $ionicModal,
                                  $ionicScrollDelegate,
                                  $ionicSlideBoxDelegate,
                                  DealService) {

  $scope.dealShareButton = false;
  if ($ionicHistory.backView().stateName === 'app.chat') {
    $scope.dealShareButton = true;
  }

  $scope.shareDeal = function() {
    console.log('share deal');
  };

  $scope.deal = DealService.currentDeal;
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

});

