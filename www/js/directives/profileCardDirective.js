angular.module('letterbox.directives')

.directive('profileCard', function() {
  return {
    scope: {},
    controller: ['$scope', 'ReportService', '$state', 'DealService', function($scope, ReportService, $state, DealService) {
      $scope.reportUser = function(userName, userId, callback) {
        ReportService.showReportPopup(userName, userId, $scope, callback);
      }.bind(this);

      $scope.viewDeal = function(deal) {
        DealService.setCurrentDeal(deal);
        DealService.showShare = true;
        $state.go('app.deal');
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

