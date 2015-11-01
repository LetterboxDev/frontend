angular.module('letterbox.controllers')

.controller('OtherProfileCtrl', function($scope,
                                         UserProfileService) {

  $scope.user = UserProfileService.getCurrentProfile();
  $scope.user.name = $scope.user.firstName;
  $scope.user.profile_pic = $scope.user.pictureMed;

});

