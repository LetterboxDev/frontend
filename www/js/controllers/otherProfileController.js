angular.module('letterbox.controllers')

.controller('OtherProfileCtrl', function($scope,
                                         $stateParams,
                                         ProfileService) {
  var userId = $stateParams.userId;
  ProfileService.getOtherProfile(userId)
    .then(function(user) {
      user.mutual_friends_count = (typeof user.mutualFriends === 'undefined') ? 'unknown' : user.mutualFriends.summary.total_count;
      $scope.user = user;
      $scope.user.name = $scope.user.firstName;
      $scope.user.profile_pic = $scope.user.pictureMed;
    });
});

