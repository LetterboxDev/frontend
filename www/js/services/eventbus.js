angular.module('letterbox.services')

.service('eventbus', function($q) {
  var Eventbus = {};
  var listeners = {};

  function asyncRun(fn, arg) {
    return $q(function(resolve, reject) {
      try {
        fn(arg);
        resolve();
      } catch (e) {
        console.log(e.stack);
        reject();
      }
    });
  }

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
        var promise = asyncRun(listeners[event][i], argument);
        promise.then(function() {
          console.log('successfully called ' + event);
        }, function() {
          console.log('error when calling ' + event);
        });
      }
    }
  };

  return Eventbus;
});
