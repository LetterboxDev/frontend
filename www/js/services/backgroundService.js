angular.module('letterbox.services')

.service('BackgroundService', function() {
  var isActive = true;
  var BackgroundService = {};
  var onResumeListeners = [];
  var onPauseListeners = [];

  function onPause() {
    isActive = false;
    for (var i = 0; i < onPauseListeners.length; i++) {
      onPauseListeners[i]();
    }
  }

  function onResume() {
    isActive = true;
    for (var i = 0; i < onResumeListeners.length; i++) {
      onResumeListeners[i]();
    }
  }

  function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
  }

  BackgroundService.isInBackground = function() {
    return !isActive;
  };

  BackgroundService.registerOnResume = function(onResume) {
    onResumeListeners.push(onResume);
  };

  BackgroundService.registerOnPause = function(onPause) {
    onPauseListeners.push(onPause);
  };

  document.addEventListener("deviceready", onDeviceReady, false);

  return BackgroundService;
});
