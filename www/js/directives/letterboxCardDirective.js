angular.module('letterbox.directives')

.directive('letterboxCard', function() {
  return {
    scope: {
      data: '=data',
    },
    controller: function() {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'templates/letterbox-card.html'
  };
});

