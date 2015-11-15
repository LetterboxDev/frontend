angular.module('letterbox.services')

.service('VibrateService', function($cordovaVibration, $state, ChatService, eventbus) {
  function vibrate() {
    $cordovaVibration.vibrate(100);
  }
  
  document.addEventListener("deviceready", function() {
    if (window.cordova) {
      eventbus.registerListener('roomCreated', vibrate);
      eventbus.registerListener('letterReceived', vibrate);
    }
  }, false);
});
