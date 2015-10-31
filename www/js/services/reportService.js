angular.module('letterbox.services')

.service('ReportService', function($q, $ionicPopup, backend) {
  var ReportService = {};

  ReportService.reportUser = function(userId, reason) {
    var deferred = $q.defer();
    backend.reportUser(userId, reason, deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  ReportService.showReportPopup = function(userName, userId, $scope, callback) {
    $scope.report = {
      reason: ''
    };
    return $ionicPopup.show({
      template: '<textarea ng-model="report.reason">',
      title: 'Report ' + userName + '?',
      subTitle: 'Please enter a reason behind this report',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Report',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.report.reason) {
            e.preventDefault();
          } else {
            ReportService.reportUser(userId, $scope.report.reason)
            .then(function() {
              $scope.report.reason = '';
              callback();
            });
          }
        }
      }]
    });
  };

  return ReportService;
});
