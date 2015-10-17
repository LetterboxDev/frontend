angular.module('starter.services')

.service('NotificationsService', function($q, backend) {
  function convertLetterToNotif(letter) {
    var questionsAnswers = [];
    for (var i = 0; i < letter.LetterAnswers.length; i++) {
      var question = letter.LetterAnswers[i];
      questionsAnswers.push({
        option0: question.WyrQuestion.option0,
        option1: question.WyrQuestion.option1,
        answer: question.answer
      });
    }
    var message = 'answered your questions. Click here to see ' + (letter.UserAccount.gender === 'male' ? 'his' : 'her') + ' responses.';
    return {
      id: letter.hash,
      isRead: letter.isRead,
      createdAt: letter.createdAt,
      from: letter.UserAccount.firstName,
      fromGender: letter.UserAccount.gender,
      age: (new Date).getYear() - new Date(letter.UserAccount.birthday).getYear(),
      bio: letter.UserAccount.bio,
      profilePicThumb: letter.UserAccount.pictureThumb,
      profilePicMed: letter.UserAccount.pictureMed,
      questionsAnswers: questionsAnswers,
      message: message
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
      var deferred = $q.defer();
      backend.getAllLetters().$promise
      .then(function(letters) {
        var count = 0;
        letters.forEach(function(letter) {
          if (letter.isRead) count++;
        });
        deferred.resolve(count);
      });
      return deferred.promise;
    }
  };
});