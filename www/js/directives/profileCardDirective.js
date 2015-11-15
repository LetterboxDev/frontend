angular.module('letterbox.directives')

.directive('profileCard', function($ionicHistory) {
  return {
    scope: {},
    controller: ['$scope', 'ReportService', '$state', 'DealService', function($scope, ReportService, $state, DealService) {
      $scope.reportUser = function(userName, userId, callback) {
        ReportService.showReportPopup(userName, userId, $scope, callback);
      }.bind(this);

      $scope.viewDeal = function(deal) {
        $ionicHistory.nextViewOptions({
          disableBack: false
        });
        $state.go('app.deal', { dealId: deal.id });
      }.bind(this);
    }],
    controllerAs: 'ctrl',
    bindToController: {
      'data': '=info',
      'callback': '&'
    },
    replace: true,
    transclude: true,
    templateUrl: 'templates/profile-card.html'
  };
});

