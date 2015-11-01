angular.module('letterbox.directives')

.directive('responseCard', function() {
  return {
    scope: {},
    controller: ['$scope', function($scope) {
    }],
    controllerAs: 'ctrl',
    bindToController: {
      'data': '=info',
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/response-card.html'
  };
});

