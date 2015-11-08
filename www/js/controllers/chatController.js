angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope,
                                 $stateParams,
                                 $ionicScrollDelegate,
                                 $ionicModal,
                                 $window,
                                 $timeout,
                                 $state,
                                 $ionicPopover,
                                 $ionicPopup,
                                 backend,
                                 ChatService,
                                 DealService,
                                 RoomsService,
                                 UserProfileService,
                                 UserLetterService,
                                 DealShareService,
                                 eventbus,
                                 socket) {

  $scope.recipient = '';
  $scope.recipientId = '';
  $scope.data = {message: ''};
  $scope.viewingDeals = 'mutual';
  $scope.deals = {
    own: [],
    user: [],
    mutual: []
  };

  $scope.roomHash = $stateParams.chatId;
  $scope.room = RoomsService.getRoom($scope.roomHash);

  $ionicPopover.fromTemplateUrl('templates/chatpopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    if (message.Deal) {
      DealService.addDealThumbnail(message.Deal);
    }
    if (message.RoomHash === $scope.roomHash) {
      $scope.messages.push(ChatService.formatMessage(message));
      $scope.$apply();
      $ionicScrollDelegate.scrollBottom(true);
    }
  });

  var onKeyboardHide = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

  var onKeyboardShow = function() {
    $ionicScrollDelegate.scrollBottom(false);
  };

  $scope.$on("$ionicView.enter", function(scopes, states) {
    $scope.messages = [];
    ChatService.getRecipientName($scope.roomHash).then(function(recipient) {
      $scope.recipient = recipient;
    });

    ChatService.getRecipientHashedId($scope.roomHash).then(function(hashedId) {
      $scope.recipientId = hashedId;
    });

    ChatService.getMessagesFromBackend($scope.roomHash).then(function(messages) {
      $scope.messages = messages;
      $ionicScrollDelegate.scrollBottom(false);
    });

    $scope.fetchLikedDeals();

    window.addEventListener('native.keyboardhide', onKeyboardHide, false);
    window.addEventListener('native.keyboardshow', onKeyboardShow, false);
  });

  $scope.$on("$ionicView.leave", function(scopes, states) {
    window.removeEventListener('native.keyboardhide', onKeyboardHide, false);
    window.removeEventListener('native.keyboardshow', onKeyboardShow, false);
  });

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
      DealShareService.setCurrentRoomHash($scope.roomHash);
      $scope.shareModal.show();
    }, function() {
      var alertPopup = $ionicPopup.alert({
        title: $scope.recipient + '\'s Letterbox doesn\'t support deals yet!',
        template: 'Try informing ' + $scope.recipient + ' to get the latest Letterbox app'
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
    ChatService.getRecipientUserData($scope.roomHash).then(function(user) {
      UserProfileService.setCurrentProfile(user);
      $state.go('app.other-profile');
    });
    $scope.closePopover();
  };

  $scope.showResponses = function() {
    RoomsService.getRoomLetter($scope.roomHash).then(function(letter) {
      UserLetterService.setCurrentLetter(letter);
      $state.go('app.other-letter');
    });
    $scope.closePopover();
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.viewDeal = function(deal) {
    DealService.setCurrentDeal(deal);
    DealService.showShare = true;
    $state.go('app.deal');
    $scope.closeShareModal();
  };

  $scope.viewSharedDeal = function(deal) {
    DealService.setCurrentDeal(deal);
    DealService.showShare = false;
    $state.go('app.deal');
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
