angular.module('letterbox.services')

.service('PushService', function(backend) {
  return {
    updatePushToken: function() {
      var token = window.localStorage.getItem('pushToken');
      if (token) {
        backend.updatePushToken(token);
      }
    }
  };
});
