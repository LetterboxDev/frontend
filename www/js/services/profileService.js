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
    }
  }
});