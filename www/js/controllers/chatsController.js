angular.module('letterbox.controllers')

.controller('ChatsCtrl', function($scope,
                                  $state,
                                  RoomsService,
                                  eventbus) {

  $scope.chats = [];
  $scope.isLoading = false;

  $scope.$on('$ionicView.enter', function() {
    RoomsService.setChatsPageScope($scope);
    $scope.chats = RoomsService.getChats();
    RoomsService.updateRooms();
  });
});
