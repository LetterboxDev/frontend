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

      $scope.likedDeals = [
    {
      "id": 12,
      "title": "Santa’s Igloo",
      "description": "<strong>10% discount for NUS Alumni, Students and Staff off Cover Charge ($10-$12)</strong><br><br>Santa’s Igloo is an anti-café where you pay for the time spent and get to enjoy everything else in the café. Perfect place to hangout & chill with friends!",
      "location": "*SCAPE, 2 Orchard Link, #03-01, Santa’s Igloo",
      "expiry": "2016-05-03T00:00:00.000Z",
      "type": "deal",
      "createdAt": "2015-11-06T12:26:50.000Z",
      "updatedAt": "2015-11-08T05:29:46.000Z",
      "DealCategoryTitle": "Leisure",
      "DealProviderName": "NUStyle",
      "likeCount": 4,
      "isLiked": true,
      "images": [
        "http://i.imgur.com/rEcIhXG.jpg",
        "http://i.imgur.com/hJ7sR9k.png",
        "http://i.imgur.com/A2vy4fl.jpg"
      ],
      "thumbnail": "http://i.imgur.com/rEcIhXGb.jpg"
    },
    {
      "id": 29,
      "title": "The Waffle",
      "description": "<strong>50% off on the 2nd waffle purchase made within 1 transaction.</strong><br><br>For students, staff, and upon presentation of valid NUS card only.<br><br>The Waffle specially produces its waffles in donut sizes so that customers can enjoy a satisfying waffle on the go, with the right portion, without having to share! With 20 different sweet and savoury flavours to choose from, it does not burn a hole in your pocket, because our waffles are all reasonably priced from $1.80 to $2.30.Using only the freshest key ingredients of self-made yoghurt, butter, milk, eggs and wheat flour, our crispy yet soft textured waffles are free from any preservatives, colouring or food additives.",
      "location": "Bugis Junction 200 Victoria Street #B1-K6",
      "expiry": "2015-11-15T00:00:00.000Z",
      "type": "deal",
      "createdAt": "2015-11-08T04:53:29.000Z",
      "updatedAt": "2015-11-08T05:31:49.000Z",
      "DealCategoryTitle": "Dining",
      "DealProviderName": "NUStyle",
      "likeCount": 2,
      "isLiked": true,
      "images": [
        "http://i.imgur.com/qtqypkl.jpg"
      ],
      "thumbnail": "http://i.imgur.com/qtqypklb.jpg"
    },
    {
      "id": 28,
      "title": "Skinny Pizza",
      "description": "<strong>10% discount off all (*regular priced) items purchased in all 6 Skinny Pizza outlets.</strong><br><br>For students, staff, and upon presentation of valid NUS card only. Present NUS matriculation card prior to ordering. Not valid with any other promotion and discounts.<br><br>The name says it all – Skinny Pizza has the thinnest, crackiest crust with the crunchiest texture. Inspired by the local paper prata, Skinny Pizza is the perfect low-carb mix of a super-thin crisp pizza base and great-tasting toppings using only the freshest premium ingredients, such as juicy roasted tomatoes, sweet peppers, the freshest seafood, milky mozzarella and smoky salami.<br><br>Every pizza is served with a healthy lashing of greens. Today, the thin-ovative Skinny Pizza menu offers 17 (and counting) scrumptious varieties. Firm favourites include Truffle Mushroom, Squid Ink, Ginger Butter Chicken and the brand’s signature Chicken Satay Pizza.",
      "location": "All Skinny Pizza outlets",
      "expiry": "2015-12-31T00:00:00.000Z",
      "type": "deal",
      "createdAt": "2015-11-08T04:53:00.000Z",
      "updatedAt": "2015-11-08T05:29:46.000Z",
      "DealCategoryTitle": "Dining",
      "DealProviderName": "NUStyle",
      "likeCount": 1,
      "isLiked": true,
      "images": [
        "http://i.imgur.com/qNYf3vZ.jpg"
      ],
      "thumbnail": "http://i.imgur.com/qNYf3vZb.jpg"
    },
    {
      "id": 23,
      "title": "The Bar at Waku Ghin by Chef Tetsuya Wakuda",
      "description": "<strong>10% off total bill with minimum spend of $200.</strong><br><br>The simplicity of a Waku Ghin dining experience extends to its bar. Experience the art of Japanese-style cocktail making with over 85 handcrafted cocktails, premium sake and whiskey.<br><br>In addition, Citi ULTIMA and Citi Prestige Cardmembers get complimentary Champagne or Prosecco.",
      "location": "The Shoppes at Marina Bay Sands, Atrium 2, L2-02",
      "expiry": "2016-06-01T00:00:00.000Z",
      "type": "deal",
      "createdAt": "2015-11-08T04:50:26.000Z",
      "updatedAt": "2015-11-08T05:29:46.000Z",
      "DealCategoryTitle": "Dining",
      "DealProviderName": "Citibank Cards",
      "likeCount": 1,
      "isLiked": true,
      "images": [
        "http://i.imgur.com/aVbn8HM.jpg"
      ],
      "thumbnail": "http://i.imgur.com/aVbn8HMb.jpg"
    },
    {
      "id": 7,
      "title": "Furama RiverFront, Singapore",
      "description": "<strong>1-for-1 Buffet Lunch and Dinner (The Square @ Furama & Kintamani Indonesian Restaurant).</strong><br><br>Other terms and conditions apply.",
      "location": "405 Havelock Road",
      "expiry": "2016-01-31T00:00:00.000Z",
      "type": "deal",
      "createdAt": "2015-11-06T12:24:41.000Z",
      "updatedAt": "2015-11-08T05:29:45.000Z",
      "DealCategoryTitle": "Dining",
      "DealProviderName": "UOB Cards",
      "likeCount": 2,
      "isLiked": true,
      "images": [
        "http://i.imgur.com/W94DN8E.png"
      ],
      "thumbnail": "http://i.imgur.com/W94DN8Eb.png"
    }
  ];
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

