angular.module('letterbox.directives')

.directive('letterboxCard', function() {
  return {
    scope: {
      data: '=data',
      dismiss: '&onDismiss',
      proceed: '&onProceed'
    },
    controller: function() {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    replace: true,
    templateUrl: 'templates/letterbox-card.html'
  };
});

