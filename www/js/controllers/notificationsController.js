angular.module('letterbox.controllers')

.controller('NotificationsCtrl', function($scope,
                                          $state,
                                          $ionicModal,
                                          NotificationsService,
                                          RoomsService,
                                          eventbus,
                                          backend) {

  $scope.notifications = [];
  $scope.chats = [];
  $scope.isLoading = false;
  $scope.currentTab = NotificationsService.getTab();

  $scope.setTab = function(tab) {
    $scope.currentTab = tab;
    NotificationsService.setTab(tab);
  }
  function refreshNotifications() {
    $scope.isLoading = true;
    NotificationsService.getNotificationsList().then(function(notifications) {
      $scope.notifications = notifications;
      $scope.isLoading = false;
    });
  }

  eventbus.registerListener('roomMessage', function(roomMessage) {
    var message = roomMessage.message;
    for (var i = 0; i < $scope.chats.length; i++) {
      if ($scope.chats[i].id === message.RoomHash) {
        $scope.chats[i].last_message = (message.sender === window.localStorage.getItem('hashedId') ? 'You: ' : $scope.chats[i].from + ': ') + message.content;
        $scope.chats[i].last_activity = new Date(message.timeSent);
        if (message.sender !== window.localStorage.getItem('hashedId')) {
          $scope.chats[i].unread_count++;
        }
        break;
      }
    }
    $scope.chats.sort(function(a, b) {
      return b.last_activity.getTime() - a.last_activity.getTime();
    });
    $scope.$apply();
  });

  eventbus.registerListener('letterReceived', refreshNotifications);

  $scope.$on("$ionicView.enter", function(scopes, states) {
    RoomsService.setNotifsPageScope($scope);
    refreshNotifications();
    $scope.chats = RoomsService.getChats();
    RoomsService.updateRooms();
  });

  $scope.selectNotification = function(notification) {
    notification.isRead = true;
    $scope.selectedLetter = notification;
    backend.markLetterAsRead(notification.id);
    $state.go('app.response', {responseId: notification.id});
  };
});
