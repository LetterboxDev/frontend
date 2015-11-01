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

    $scope.warning = '';

    return $ionicPopup.show({
      template: '<textarea ng-model="report.reason"></textarea><p class="warning">{{ warning }}</p>',
      title: 'Report ' + userName + '?',
      subTitle: 'Please enter a reason behind this report',
      cssClass: 'popup-alert',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Report',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.report.reason || $scope.report.reason.length <= 10) {
            e.preventDefault();
            $scope.warning = "Please enter a reason at least 10 characters long.";
          } else {
            ReportService.reportUser(userId, $scope.report.reason)
            .then(function() {
              $scope.report.reason = '';
              if (typeof callback !== 'undefined') {
                callback();
              }
            });
          }
        }
      }]
    });
  };

  return ReportService;
});
