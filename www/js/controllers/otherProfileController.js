angular.module('letterbox.controllers')

.controller('OtherProfileCtrl', function($scope,
                                         $stateParams,
                                         ProfileService,
                                         UserProfileService) {

  var userId = $stateParams.userId;
  ProfileService.getOtherProfile(userId)
    .then(function(user) {
      $scope.user = user;
      $scope.user.name = $scope.user.firstName;
      $scope.user.profile_pic = $scope.user.pictureMed;
    });
});

