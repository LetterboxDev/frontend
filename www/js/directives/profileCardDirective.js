angular.module('letterbox.directives')

.directive('profileCard', function() {
  return {
    scope: {},
    controller: ['$scope', 'ReportService', function($scope, ReportService) {
      $scope.reportUser = function(userName, userId) {
        ReportService.showReportPopup(userName, userId, $scope, $scope.changeCard);
      }.bind(this);
    }],
    controllerAs: 'ctrl',
    bindToController: {
      'data': '=info',
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/profile-card.html'
  };
});

