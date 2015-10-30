angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope,
                                 $stateParams,
                                 $ionicScrollDelegate,
                                 $window,
                                 $timeout,
                                 $state,
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

  $scope.showProfile = function() {
    backend.getLetterFromOtherUser($scope.recipientId).$promise.then(function(res){
      var responseId = res[0].hash;
      $state.go('app.response', {responseId: responseId});
    }, function(err){
      console.log("Couldn't retrive response Id");
    });
  }
});
