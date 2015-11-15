angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope,
                                 $state,
                                 $stateParams,
                                 $ionicScrollDelegate,
                                 $ionicModal,
                                 $window,
                                 $timeout,
                                 $ionicPopover,
                                 $ionicPopup,
                                 $ionicLoading,
                                 ChatService,
                                 DealService,
                                 RoomsService,
                                 socket) {

  $scope.messages = [];
  $scope.recipient = '';
  $scope.recipientId = '';
  $scope.data = {message: ''};
  $scope.viewingDeals = 'mutual';
  $scope.fromSubPage = false;
  $scope.deals = {
    own: [],
    user: [],
    mutual: []
  };
  $scope.limit = 40;

  $scope.roomHash = $stateParams.chatId;
  $scope.room = RoomsService.getRoom($scope.roomHash);

  $ionicPopover.fromTemplateUrl('templates/chatpopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  var onKeyboardHide = function() {
    $scope.limit = 40;
    $scope.$apply();
    $ionicScrollDelegate.scrollBottom(true);
  };

  var onKeyboardShow = function() {
    $scope.limit = 40;
    $scope.$apply();
    $ionicScrollDelegate.scrollBottom(false);
  };

  $scope.$on("$ionicView.enter", function(scopes, states) {
    ChatService.getRecipientName($scope.roomHash).then(function(recipient) {
      $scope.recipient = recipient;
    });

    ChatService.getRecipientHashedId($scope.roomHash).then(function(hashedId) {
      $scope.recipientId = hashedId;
    });

    ChatService.getMessagesFromBackend($scope.roomHash).then(function(messages) {
      ChatService.setCurrentRoom($scope.roomHash, $scope, $ionicScrollDelegate);
      if (!$scope.fromSubPage) {
        $scope.messages = messages;
        if (messages.length) socket.roomRead($scope.roomHash, messages[messages.length-1].timestamp.getTime());
        $ionicScrollDelegate.scrollBottom(false);
      }
    });

    window.addEventListener('native.keyboardhide', onKeyboardHide, false);
    window.addEventListener('native.keyboardshow', onKeyboardShow, false);
  });

  $scope.$on("$ionicView.leave", function(scopes, states) {
    window.removeEventListener('native.keyboardhide', onKeyboardHide, false);
    window.removeEventListener('native.keyboardshow', onKeyboardShow, false);
  });

  $scope.loadPrevious = function() {
    var previousHeight = $('.messages-list > .list').height();
    $scope.limit = Math.min($scope.limit + 15, $scope.messages.length);
    $scope.$apply();
    $ionicScrollDelegate.$getByHandle('chatScroll')
                        .scrollBy(0,
                                  $('.messages-list > .list').height() - previousHeight,
                                  false);
  }

  $scope.onKeyPress = function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $scope.sendMessage();
    }
  };

  $scope.sendMessage = function() {
    var content = $scope.data.message;
    if (content && content.length !== 0) {
      socket.sendMessage($scope.roomHash, content);
      $scope.data.message = '';
    }
  };

  $ionicModal.fromTemplateUrl('templates/deal-share-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.shareModal = modal;
  });

  $scope.openShareModal = function() {
    DealService.checkDealCompatability($scope.recipientId)
    .then(function() {
      $scope.fetchLikedDeals();
      $scope.shareModal.show();
    }, function() {
      var alertPopup = $ionicPopup.alert({
        title: $scope.recipient + '\'s Letterbox doesn\'t support cutouts yet!',
        template: 'Try informing ' + $scope.recipient + ' to get the latest Letterbox app',
        cssClass: "popup-alert"
      });
    });
  };

  $scope.closeShareModal = function() {
    $scope.shareModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.shareModal.remove();
  });

  $scope.showPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.showOtherUserProfile = function() {
    $scope.showLoading();
    ChatService.getRecipientHashedId($scope.roomHash).then(function(userId) {
      $scope.hideLoading();
      $scope.fromSubPage = true;
      $state.go('app.other-profile', { userId: userId });
    });
    $scope.closePopover();
  };

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>'
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.showResponses = function() {
    $scope.closePopover();
    $scope.fromSubPage = true;
    $state.go('app.other-letter', { roomHash: $scope.roomHash });
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.viewDeal = function(deal) {
    DealService.showShare = true;
    $scope.fromSubPage = true;
    $state.go('app.deal', { dealId: deal.id, roomHash: $scope.roomHash });
    $scope.closeShareModal();
  };

  $scope.viewSharedDeal = function(deal) {
    DealService.showShare = false;
    $scope.fromSubPage = true;
    $state.go('app.deal', { dealId: deal.id });
  };

  $scope.fetchLikedDeals = function() {
    DealService.getOwnLikedDeals().then(function(deals) {
      $scope.deals['own'] = deals;
    });

    DealService.getUserLikedDeals($scope.recipientId).then(function(deals) {
      $scope.deals['user'] = deals;
    });

    DealService.getMutualLikedDeals($scope.recipientId).then(function(deals) {
      $scope.deals['mutual'] = deals;
    });
  };
});
