angular.module('letterbox.services')

.service('NotificationsService', function($q, backend) {
  var currentNotifications = [];

  function convertLetterToNotif(letter) {
    var questionsAnswers = [];
    for (var i = 0; i < letter.LetterAnswers.length; i++) {
      var question = letter.LetterAnswers[i];
      questionsAnswers.push({
        option0: question.WyrQuestion.option0,
        option1: question.WyrQuestion.option1,
        answer: question.answer,
        isCorrect: question.isCorrect
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
        currentNotifications = result;
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
          if (!letter.isRead) count++;
        });
        deferred.resolve(count);
      });
      return deferred.promise;
    },

    getNotificationFromId: function(id) {
      var deferred = $q.defer();
      var found = false;
      if (currentNotifications.length === 0) {
        this.getNotificationsList().then(function(notifications) {
          var deferred = $q.defer();
          currentNotifications.forEach(function(notif) {
            if (notif.id === id) {
              found = true;
              deferred.resolve(notif);
            }
          });

          if (!found) {
            deferred.resolve({});
          }
          return deferred.promise;
        });
      }
      else {
        currentNotifications.forEach(function(notif) {
          if (notif.id === id) {
            found = true;
            deferred.resolve(notif);
          }
        });

        if (!found) {
          deferred.resolve(null);
        }

        return deferred.promise;
      }
    }
  };
});
