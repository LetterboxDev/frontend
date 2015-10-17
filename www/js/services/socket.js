angular.module('starter.services')
.service('socket', function(eventbus, $q) {
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

  SocketService.isConnected = function() {
    return IOContainer.isInitialized && IOContainer.socketio.connected;
  }

  SocketService.sendMessage = function(roomHash, message) {
    var deferred = $q.defer();
    if (SocketService.isConnected()) {
      var message = {
        roomHash: roomHash,
        message: message
      };
      IOContainer.socketio.emit('roomMessage', message);
      deferred.resolve(message);
    } else if (IOContainer.isInitialized && IOContainer.socketio.connected) {
      deferred.reject({error: 'socketio not connected'});
    } else {
      deferred.reject({error: 'socketio not initialized'});
    }
    return deferred.promise;
  };

  return SocketService;
});
