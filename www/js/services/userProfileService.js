angular.module('letterbox.services')

.service('UserProfileService', function($q) {
  var profile = {};

  var setCurrentProfile = function(newProfile) {
    profile = newProfile;
  };

  var getCurrentProfile = function() {
    return profile;
  };

  return {
    setCurrentProfile: setCurrentProfile,
    getCurrentProfile: getCurrentProfile
  };

});
