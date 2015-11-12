angular.module('letterbox.services')

.service('LocalNotificationService', function($state,
                                              eventbus,
                                              BackgroundService) {

  
  var LocalNotification = {};

  function registerListeners() {
    if (window.cordova) {
      eventbus.registerListener('roomMessage', function(roomMessage) {
        if (BackgroundService.isInBackground() ||
           (!$state.includes('app.chat', {chatId: roomMessage.message.RoomHash}) &&
            roomMessage.message.sender !== window.localStorage.getItem('hashedId'))) {
          window.cordova.plugins.notification.local.schedule({
            id: 1,
            text: roomMessage.senderName + ": " + roomMessage.message.content,
            data: {
              type: 'room',              
              RoomHash: roomMessage.message.RoomHash
            }
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
            }
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
            }
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
