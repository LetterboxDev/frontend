angular.module('letterbox.directives')

.directive('profilePicSmall', function($document) {
  return {
    scope: {
      data: '=set',
    },
    restrict: 'EA',
    replace: true,
    controller: function($scope) {
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/profile-pic-small.html'
  };
});

