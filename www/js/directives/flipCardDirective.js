angular.module('starter.directives')

.directive('flipCard', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      // should do some trick with class finding, use span to hack first
      $element.find('span').on('touch', function(e) {
        $element.toggleClass('hover');
      });
    }
  };
});

