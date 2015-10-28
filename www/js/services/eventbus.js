angular.module('letterbox.services')

.service('eventbus', function() {
  var Eventbus = {};
  var listeners = {};

  Eventbus.deregisterAllListeners = function(event) {
    console.log('deregistered listener: ' + event);
    if (listeners[event] instanceof Array) {
      listeners[event] = [];
    }
  };

  Eventbus.registerListener = function(event, listener) {
    console.log('registered listener: ' + event);
    if (listeners[event] instanceof Array) {
      listeners[event].push(listener);
    } else {
      listeners[event] = [listener];
    }
  };

  Eventbus.call = function(event, argument) {
    console.log('called listener: ' + event);
    if (listeners[event] instanceof Array) {
      for (var i = 0; i < listeners[event].length; i++) {
        listeners[event][i](argument);
      }
    }
  };

  return Eventbus;
});
