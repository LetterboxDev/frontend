angular.module('letterbox.controllers')

.controller('DealsCtrl', function($scope,
                                  $rootScope,
                                  $state,
                                  DealCategoryService,
                                  DealService) {
  $scope.deals = [
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    },
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    },
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    },
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    },
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    },
    {
       "id": 6,
       "title": "Marriott Cafe, Singapore Marriott Tang Plaza Hotel",
       "description": "1-for-1 Lunch & Dinner Buffet. For dine-in only (Mon to Sun). Limited to first 50 customers per meal period per day. 2 days prior reservations required, subject to availability. Other terms and conditions apply.",
       "location": "320 Orchard Road",
       "expiry": "2015-12-31T00:00:00.000Z",
       "type": "deal",
       "createdAt": "2015-11-06T18:57:27.000Z",
       "updatedAt": "2015-11-06T18:57:27.000Z",
       "DealCategoryTitle": "Dining",
       "DealProviderName": "UOB Cards",
       "likeCount": 0,
       "images":
       [
       "http://lorempixel.com/250/250"
       ],
       "isLiked": false
    }
  ];

  $scope.currentCategory = DealCategoryService.currentCategory;

  // $scope.$on("$ionicView.enter", function(scopes, states) {
  //   $scope.deals = [];
  //   DealService.getDeals($scope.currentCategory).then(function(deals) {
  //     $scope.deals = deals;
  //   });
  // });

  $scope.viewLiked = function() {
    $state.go('app.liked-deals');
  }
});

