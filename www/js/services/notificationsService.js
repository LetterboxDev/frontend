angular.module('starter.services')

.service('NotificationsService', function($q, backend) {
  function convertLetterToNotif(letter) {
    var questionsAnswers = [];
    for (var i = 0; i < letter.LetterAnswers.length; i++) {
      var question = letter.LetterAnswers[i];
      questionsAnswers.push({
        option0: question.WyrQuestion.option0,
        option1: question.WyrQuestion.option1,
        answer: question.WyrQuestion.answer
      });
    }
    return {
      id: letter.hash,
      isRead: letter.isRead,
      createdAt: letter.createdAt,
      from: letter.UserAccount.firstName,
      fromGender: letter.UserAccount.gender,
      profilePicThumb: letter.UserAccount.pictureThumb,
      profilePicMed: letter.UserAccount.pictureMed,
      questionsAnswers: questionsAnswers
    };
  }

  return {
    getNotificationsList: function() {
      var deferred = $q.defer();
      backend.getAllLetters().$promise
      .then(function(letters) {
        var result = [];
        letters.forEach(function(letter) {
          result.push(convertLetterToNotif(letter));
        });
        deferred.resolve(result);
      });
      return deferred.promise;
    },

    getNumberOfNotifications: function() {
      return notifications.length;
    }
  };
});