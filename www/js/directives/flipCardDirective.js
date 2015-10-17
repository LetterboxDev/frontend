angular.module('letterbox.directives', [])

.directive('flipCard', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      function selectFirst(selector) {
        return angular.element($element[0].querySelectorAll(selector));
      }

      selectFirst('.button-flip').on('touch', function(e) {
        selectFirst('.flipper-container').toggleClass('hover');
      });
    }
  };
});

