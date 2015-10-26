angular.module('letterbox.services')

.service('letterService', function() {
  var letter = this;

  letter.targetUserCard = {};

  letter.setTargetUserCard = function(card) {
    letter.targetUserCard = card;
  };
});

