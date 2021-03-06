angular.module('letterbox.directives')

.directive('flipCard', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      angular.element($element[0].querySelectorAll('.button-flip')).on('touch', function(e) {
        $element.toggleClass('flipped');
      });
    }
  };
});
