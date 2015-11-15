angular.module('letterbox.services')

.service('LocationService', function($cordovaGeolocation, backend) {

  var LocationService = {};

  function locationObtainedCallback(position) {
    updateBackendLocation(position.coords.latitude, position.coords.longitude);
  }

  function getCordovaLocation() {
    var options = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    $cordovaGeolocation.getCurrentPosition(options).then(locationObtainedCallback);
  }

  function getHtml5Location() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationObtainedCallback);
    }
  }

  function updateBackendLocation(latitude, longitude) {
    backend.updateUserLocation(latitude, longitude);
  }

  LocationService.updateLocation = function() {
    if (window.cordova) {
      getCordovaLocation();
    } else {
      getHtml5Location();
    }
  };

  return LocationService;
});
