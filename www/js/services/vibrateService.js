angular.module('letterbox.services')

.service('VibrateService', function($cordovaVibration, $state, ChatService, eventbus) {
  function vibrate() {
    $cordovaVibration.vibrate(100);
  }
  
  document.addEventListener("deviceready", function() {
    if (window.cordova) {
      eventbus.registerListener('roomCreated', vibrate);
      eventbus.registerListener('letterReceived', vibrate);
      eventbus.registerListener('roomMessage', function(roomMessage) {
        if (roomMessage.message.sender !== window.localStorage.getItem('hashedId')
          && !$state.includes('app.chat', {chatId: roomMessage.message.RoomHash})) {
          vibrate();
        }
      });
    }
  }, false);
});
