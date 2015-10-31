angular.module('letterbox.directives')

.directive('letterboxCard', function() {
  return {
    scope: {},
    controller: ['$scope', function($scope) {

    }],
    controllerAs: 'ctrl',
    bindToController: {
      data: '=info',
      leftClick: '&onLeftClick',
      centerClick: '&onCenterClick',
      rightClick: '&onRightClick'
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/letterbox-card.html'
  };
});

