angular.module('letterbox.directives')

.directive('letterboxCard', function() {
  return {
    scope: {},
    controller: ['$scope', function($scope) {

    }],
    controllerAs: 'ctrl',
    bindToController: {
      data: '=info',
      dismiss: '&onDismiss',
      proceed: '&onProceed'
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/letterbox-card.html'
  };
});

