angular.module('letterbox.directives', [])

.directive("isFocused", function ($timeout) {
  return {
    scope: { trigger: '@isFocused' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") {
          $timeout(function() {
            element[0].focus();

            element.on('blur', function() {
              element[0].focus();
            });
          });
        }

      });
    }
  };
});
