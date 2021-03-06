angular.module('letterbox.services')

.service('ChromeNotifService', function($timeout, eventbus, ChatService) {
  var ChromeNotif = this;

  if (document.URL.indexOf( 'http://' ) !== -1 || document.URL.indexOf( 'https://' ) !== -1) {
    var Notification = window.Notification ||
                       window.mozNotification ||
                       window.webkitNotification;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    eventbus.registerListener('roomMessage', function(roomMessage) {
      var message = roomMessage.message;
      var senderName = roomMessage.senderName;
      var formattedMessage = ChatService.formatMessage(message);

      if (!formattedMessage.isOwner) {
        show(senderName, formattedMessage.content);
      }
    });

    function show(title, message) {
      var instance = new Notification(
        title, {
          body: message,
          icon: "img/android-icon-48x48.png"
        }
      );

      instance.onshow = function () {
        $timeout(function(){
          instance.close();
        }, 10000);
      };
    }
  }
});

