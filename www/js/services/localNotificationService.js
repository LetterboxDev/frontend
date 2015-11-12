angular.module('letterbox.services')

.service('LocalNotificationService', function($state,
                                              eventbus,
                                              BackgroundService) {

  
  var LocalNotification = {};

  function registerListeners() {
    if (window.cordova) {
      window.cordova.plugins.notification.local.on("click", function(notification) {
        if (notification.data.type === 'room') {
          $state.go('app.chat', {chatId: data.room.RoomHash});
        } else if (notification.data.type === 'letter') {
          $state.go('app.notifications');
        }
      });

      eventbus.registerListener('roomMessage', function(roomMessage) {
        if (roomMessage.message.sender !== window.localStorage.getItem('hashedId') &&
          (BackgroundService.isInBackground() ||
           !$state.includes('app.chat', {chatId: roomMessage.message.RoomHash}))) {
          window.cordova.plugins.notification.local.schedule({
            id: 1,
            text: roomMessage.senderName + ": " + roomMessage.message.content,
            data: {
              type: 'room',              
              RoomHash: roomMessage.message.RoomHash
            },
            smallIcon: 'res://notification'
          });
        }
      });

      eventbus.registerListener('roomCreated', function(roomData) {
        if (BackgroundService.isInBackground()) {
          window.cordova.plugins.notification.local.schedule({
            id: 1,
            text: roomData.approverName + " just started a chat with you!",
            data: {
              type: 'room',
              RoomHash: roomMessage.message.RoomHash
            },
            smallIcon: 'res://notification'
          });
        }
      });

      eventbus.registerListener('letterReceived', function(letterData) {
        if (BackgroundService.isInBackground()) {
          window.cordova.plugins.notification.local.schedule({
            id: 1,
            text: "You've received a letter!",
            data: {
              type: 'letter',
              LetterHash: letterData.hash
            },
            smallIcon: 'res://notification'
          });
        }
      });
    }
  }

  LocalNotification.clearLocalNotifications = function() {
    if (window.cordova) {
      window.cordova.plugins.notification.local.clearAll(function() {
      }, this);
    }
  };

  BackgroundService.registerOnResume(function() {
    LocalNotification.clearLocalNotifications();
  });

  document.addEventListener("deviceready", registerListeners, false);

  return LocalNotification;
});
