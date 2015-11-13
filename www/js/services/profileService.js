angular.module('letterbox.services')

.service('ProfileService', function($q, backend) {
  return {
    getProfile: function() {
      var deferred = $q.defer();
      backend.getUserSelf().$promise.then(function(profile) {
        deferred.resolve(profile);
      });
      return deferred.promise;
    },

    getOtherProfile: function(userId) {
      var deferred = $q.defer();
      backend.getOtherUser(userId).$promise
      .then(function(user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    },

    getNewQuestion: function(qnIds) {
      var deferred = $q.defer();
      backend.getOneRandomQuestion(qnIds).$promise.then(function(qn){
        deferred.resolve(qn);
      }, function(err){
        deferred.resolve(null);
      });
      return deferred.promise;
    },

    updateBio: function(bio) {
      var deferred = $q.defer();
      backend.updateUserBio(bio, function(res){
        deferred.resolve(res);
      }, function(err){
        deferred.resolve(null);
      });
      return deferred.promise;
    },

    updateQuestions: function(questions) {
      var deferred = $q.defer();
      backend.setQuestionsAndAnswers(questions, function(res){
        deferred.resolve(res);
      }, function(err){
        deferred.resolve(null);
      });
      return deferred.promise;
    },

    getProfilePictures: function() {
      var deferred = $q.defer();
      backend.getProfilePhotos().$promise.then(function(photos) {
        var pictures = [];
        photos.forEach(function(photo) {
          pictures.push(photo);
        });
        deferred.resolve(pictures);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },

    updateProfilePicture: function(pictureId) {
      var deferred = $q.defer();
      backend.setProfilePhoto(pictureId, deferred.resolve, deferred.reject);
      return deferred.promise;
    }
  }
});
