angular.module('letterbox.directives')

.directive('profileCard', function() {
  return {
    scope: {},
    controller: ['$scope', 'ReportService', function($scope, ReportService) {
      $scope.reportUser = function(userName, userId, callback) {
        ReportService.showReportPopup(userName, userId, $scope, callback);
      }.bind(this);
    }],
    controllerAs: 'ctrl',
    bindToController: {
      'data': '=info',
      'changeCard': '&'
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/profile-card.html'
  };
});

