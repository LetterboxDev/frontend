angular.module('starter.controllers')

.controller('ChatCtrl', function($scope, $stateParams, $ionicScrollDelegate, ChatService, RoomsService, eventbus, socket) {
  $scope.recipient = '';

  $scope.roomHash = $stateParams.chatId;
  $scope.room = RoomsService.getRoom($scope.roomHash);

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    if (message.RoomHash === $scope.roomHash) {
      var isOwner = message.sender === window.localStorage.getItem('hashedId');
      $scope.messages.push({
        isOwner: isOwner,
        content: message.content,
        timestamp: message.timeSent
      });
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

  $scope.sendMessage = function() {
    var content = $scope.data.message;
    socket.sendMessage($scope.roomHash, content);
    $scope.data.message = '';
  };
});