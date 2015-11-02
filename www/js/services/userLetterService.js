angular.module('letterbox.services')

.service('UserLetterService', function($q) {
  var letter = {};

  var setCurrentLetter = function(newLetter) {
    letter = newLetter;
  };

  var getCurrentLetter = function() {
    return letter;
  };

  return {
    setCurrentLetter: setCurrentLetter,
    getCurrentLetter: getCurrentLetter
  };

});
