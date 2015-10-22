angular.module('letterbox.directives')

.directive('letter', function($document, letterService) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var questions = letterService.targetUserCard.questions;
      var curr = 0;
      var max = questions.length - 1;

      angular.element($element[0].querySelectorAll('.button-next')).on('touch', function(e) {
        if (curr < max) {
          curr++;
          updateQuestion($scope, curr, questions);
        }
        resetClass($scope);
      });

      angular.element($element[0].querySelectorAll('.button-prev')).on('touch', function(e) {
        if (curr > 0) {
          curr--;
          updateQuestion($scope, curr, questions);
        }
        resetClass($scope);
      });
    }
  };

  /**
   * Helper functions
   */

  // Removes active class from .left and .right
  function resetClass($scope) {
    $scope.selectedTab = undefined;
    $scope.$apply();
  }

  // Updates the question contents
  function updateQuestion($scope, curr, questions) {
    $scope.currentQuestion = questions[curr];
    $scope.$apply();
  }
});
