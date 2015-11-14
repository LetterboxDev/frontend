angular.module('letterbox.controllers')

.controller('ChatsCtrl', function($scope,
                                  $state,
                                  RoomsService) {

  $scope.chats = [];

  $scope.$on('$ionicView.enter', function() {
    RoomsService.setChatsPageScope($scope);
    $scope.chats = RoomsService.getChats();
    RoomsService.updateRooms();
  });
});
