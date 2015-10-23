angular.module('letterbox.controllers')

.controller('ChatCtrl', function($scope, $stateParams, $ionicScrollDelegate, ChatService, RoomsService, eventbus, socket) {
  $scope.recipient = '';

  $scope.roomHash = $stateParams.chatId;
  $scope.room = RoomsService.getRoom($scope.roomHash);

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    if (message.RoomHash === $scope.roomHash) {
      $scope.messages.push(ChatService.formatMessage(message));
      $scope.$apply();
      $ionicScrollDelegate.scrollBottom(true);
    }
  });

  $scope.$on("$ionicView.enter", function(scopes, states) {
    $scope.messages = [];
    ChatService.getRecipientName($scope.roomHash).then(function(recipient) {
      $scope.recipient = recipient;
    });
    ChatService.getMessagesFromBackend($scope.roomHash).then(function(messages) {
      $scope.messages = messages;
      $ionicScrollDelegate.scrollBottom(false);
    });
  });

  $scope.onKeyPress = function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $scope.sendMessage();
    }
  };

  $scope.sendMessage = function() {
    var content = $scope.data.message;
    socket.sendMessage($scope.roomHash, content);
    $scope.data.message = '';
  };
});
