angular.module('starter.services')

.service('NotificationsService', function($q) {
  var notifications = [
    { id: 1, from: 'Helen Heng', profile_pic: "http://semantic-ui.com/images/avatar/large/helen.jpg", message: "answered your questions, click here to see her responses", timestamp: "1h"},
  ];

  // some backend link stuff here

  return {
    getNotificationsList: function() {
      return notifications;
    },

    getNumberOfNotifications: function() {
      return notifications.length;
    }
  };
});