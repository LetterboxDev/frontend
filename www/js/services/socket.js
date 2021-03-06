angular.module('letterbox.services')

.service('socket', function($q, eventbus) {
  var URL = 'http://ec2-52-74-138-177.ap-southeast-1.compute.amazonaws.com';
  // var URL = 'http://localhost:8080';

  var IOContainer = {
    isInitialized: false,
    socketio: null
  };
  var SocketService = {};

  SocketService.uninit = function() {
    IOContainer.isInitialized = false;
    IOContainer.socketio.disconnect();
    IOContainer.socketio = null;
  };

  SocketService.init = function() {
    console.log('Initializing Socket IO...');
    var token = window.localStorage.getItem('token');
    if (!IOContainer.isInitialized && token) {
      IOContainer.isInitialized = true;
      IOContainer.socketio = io.connect(URL, {
        'query': 'token=' + token
      });
      IOContainer.socketio.connect();
      IOContainer.socketio.on('connect', function() {
        eventbus.call('socketConnected');
      });
      IOContainer.socketio.on('disconnect', function() {
        eventbus.call('socketDisconnected');
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
      IOContainer.socketio.on('roomRead', function(roomRead) {
        eventbus.call('roomRead', roomRead);
      });
    }
  };

  SocketService.isConnected = function() {
    return IOContainer.isInitialized && IOContainer.socketio.connected;
  };

  SocketService.roomRead = function(roomHash, time) {
    var deferred = $q.defer();
    if (SocketService.isConnected()) {
      var roomRead = {
        roomHash: roomHash,
        time: time
      };
      IOContainer.socketio.emit('roomRead', roomRead);
      deferred.resolve(roomRead);
    } else if (IOContainer.isInitialized && IOContainer.socketio.connected) {
      deferred.reject({error: 'socketio not connected'});
    } else {
      deferred.reject({error: 'socketio not initialized'});
    }
    return deferred.promise;
  };

  SocketService.sendMessage = function(roomHash, message) {
    var deferred = $q.defer();
    if (SocketService.isConnected()) {
      var message = {
        roomHash: roomHash,
        message: message,
        type: 'message'
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

  SocketService.shareDeal = function(roomHash, message, dealId) {
    var deferred = $q.defer();
    if (SocketService.isConnected()) {
      var message = {
        roomHash: roomHash,
        message: message,
        type: 'share',
        dealId: dealId
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
