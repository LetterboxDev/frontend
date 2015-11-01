angular.module('letterbox.services')

.service('UserResponseService', function($q) {
  var response = {};

  var setCurrentResponse = function(newResponse) {
    response = newResponse;
  };

  var getCurrentResponse = function() {
    return response;
  };

  return {
    setCurrentResponse: setCurrentResponse,
    getCurrentResponse: getCurrentResponse
  };

});
