angular.module('starter.directives')

.directive('flipCard', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      angular.element($element[0].querySelectorAll('.button-flip')).on('touch', function(e) {
        console.log($element);
        $element.toggleClass('hover');
      });
    }
  };
});

