angular.module('starter.directives')

.directive('flipCard', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $element.find('i').on('touch', function(e) {
        $element.toggleClass('hover');
      });
    }
  };
});

