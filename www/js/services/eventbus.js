angular.module('starter.services')
.service('eventbus', function($q) {
  var Eventbus = {};
  var listeners = {};

  Eventbus.registerListener = function(event, listener) {
    console.log('registered listener');
    if (listeners[event] instanceof Array) {
      listeners[event].push(listener);
    } else {
      listeners[event] = [listener];
    }
  };

  Eventbus.call = function(event, argument) {
    console.log('called listener');
    if (listeners[event] instanceof Array) {
      for (var i = 0; i < listeners[event].length; i++) {
        listeners[event][i](argument);
      }
    }
  };

  return Eventbus;
});
