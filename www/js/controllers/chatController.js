angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope,
                                 $state,
                                 $stateParams,
                                 $ionicScrollDelegate,
                                 $ionicModal,
                                 $window,
                                 $timeout,
                                 $state,
                                 $ionicPopover,
                                 $ionicPopup,
                                 $ionicLoading,
                                 backend,
                                 BackgroundService,
                                 ChatService,
                                 DealService,
                                 RoomsService,
                                 eventbus,
                                 socket) {

  $scope.messages = [];
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

    if (message.RoomHash === $scope.roomHash) {
      var formattedMessage = ChatService.formatMessage(message);
      $scope.messages.push(formattedMessage);
      $scope.$apply();
      $ionicScrollDelegate.scrollBottom(true);
    }

    if (!BackgroundService.isInBackground() && $state.includes('app.chat', {chatId: roomMessage.message.RoomHash})) {
      socket.roomRead(roomMessage.message.RoomHash, roomMessage.message.timeSent);
    }
  });

  eventbus.registerListener('windowFocused', function() {
    if ($state.includes('app.chat', {chatId: $scope.roomHash}) && $scope.messages.length > 0) {
      socket.roomRead($scope.roomHash, $scope.messages[$scope.messages.length-1].timestamp.getTime());
    }
  });

  var onKeyboardHide = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

  var onKeyboardShow = function() {
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
      var i = 0, j = 0;
      var initialMessageCount = $scope.messages.length;
      var messageAdded = false;
      while (i < messages.length && j < $scope.messages.length) {
        if (messages[i].timestamp > $scope.messages[j].timestamp) {
          j++;
        } else if (messages[i].timestamp.getTime() === $scope.messages[j].timestamp.getTime()) {
          i++;
        } else {
          $scope.messages.splice(j, 0, messages[i]);
          messageAdded = true;
        }
      }
      if (messages.length > $scope.messages.length) {
        messageAdded = true;
        for (var k = $scope.messages.length; k < messages.length; k++) {
          $scope.messages.push(messages[k]);
        }
      }
      if (messages.length > 0) {
        socket.roomRead($scope.roomHash, messages[messages.length-1].timestamp.getTime());
      }
      $scope.messages = messages;
      if (messageAdded) {
        $ionicScrollDelegate.scrollBottom(initialMessageCount !== 0);
      }
    });

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
    $state.go('app.other-letter', { roomHash: $scope.roomHash });
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.viewDeal = function(deal) {
    DealService.showShare = true;
    $state.go('app.deal', { dealId: deal.id, roomHash: $scope.roomHash });
    $scope.closeShareModal();
  };

  $scope.viewSharedDeal = function(deal) {
    DealService.showShare = false;
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
