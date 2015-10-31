angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope,
                                 $stateParams,
                                 $ionicScrollDelegate,
                                 $window,
                                 $timeout,
                                 $state,
                                 $ionicPopover,
                                 backend,
                                 ChatService,
                                 RoomsService,
                                 eventbus,
                                 socket) {

  $scope.recipient = '';
  $scope.recipientId = '';
  $scope.data = {message: ''};

  $scope.roomHash = $stateParams.chatId;
  $scope.room = RoomsService.getRoom($scope.roomHash);

  $scope.isTextareaFocus = false;

  $ionicPopover.fromTemplateUrl('templates/chatpopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
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
      $scope.isTextareaFocus = true;
    }
  };

  $scope.showPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.showOtherUserProfile = function() {
    // TODO show other user profile
    ChatService.getRecipientUserData($scope.roomHash).then(function(user) {
      // Handle going to profile here, This could also be done in profile page
      console.log(user); // For you to see format of data
    });
    $scope.closePopover();
  };

  $scope.showResponses = function() {
    // TODO show responses to questions
    RoomsService.getRoomLetter($scope.roomHash).then(function(letter) {
      // Handle letter here, This could also be done in the responses page
      console.log(letter); // For you to see format of data
    });
    $scope.closePopover();
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };
});
