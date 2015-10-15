angular.module('starter.services')
.service('socket', function(eventbus) {
  var URL = 'http://ec2-52-74-138-177.ap-southeast-1.compute.amazonaws.com';
  // var URL = 'http://localhost:8080';

  var IOContainer = {
    isInitialized: false,
    socketio: null
  };
  var SocketService = {};

  SocketService.init = function() {
    console.log('Initializing Socket IO...');
    var token = window.localStorage.getItem('token');
    if (!IOContainer.isInitialized && token) {
      IOContainer.isInitialized = true;
      IOContainer.socketio = io.connect(URL, {
        'query': 'token=' + token
      });
      IOContainer.socketio.on('roomCreated', function(data) {
        eventbus.call('roomCreated', data);
      });
      IOContainer.socketio.on('roomMessage', function(data) {
        eventbus.call('roomMessage', data);
      });
      IOContainer.socketio.on('letter', function(letter) {
        eventbus.call('letterReceived', letter);
      });
    }
  };

  SocketService.sendMessage = function(roomHash, message) {
    if (IOContainer.isInitialized) {
      IOContainer.socketio.emit('roomMessage', {
        roomHash: roomHash,
        authorName: window.localStorage.getItem('firstName'),
        message: message
      });
    }
  };

  return SocketService;
});
