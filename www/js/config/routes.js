angular.module('letterbox')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'OnboardingCtrl'
  })

  .state('onboarding', {
    url: '/onboarding/:onboardStep',
    templateUrl: function ($stateParams){
      return 'templates/onboard' + $stateParams.onboardStep + '.html';
    },
    controller: 'OnboardingCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.letter', {
    url: '/letter',
    views: {
      'menuContent': {
        templateUrl: 'templates/letter.html',
        controller: 'LetterCtrl'
      }
    }
  })

  .state('app.chats', {
    url: '/chats',
    views: {
      'menuContent': {
        templateUrl: 'templates/chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('app.chat', {
    url: '/chats/:chatId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl',
      }
    }
  })

  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications.html',
        controller: 'NotificationsCtrl'
      }
    }
  })

  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })

  .state('app.deals', {
    url: '/deals/:category',
    views: {
      'menuContent': {
        templateUrl: 'templates/deals.html',
        controller: 'DealsCtrl'
      }
    }
  })

  .state('app.deal', {
    url: '/deal/:dealId/:roomHash',
    views: {
      'menuContent': {
        templateUrl: 'templates/deal.html',
        controller: 'DealCtrl'
      }
    },
    cache: false
  })

  .state('app.liked-deals', {
    url: '/liked-deals',
    views: {
      'menuContent': {
        templateUrl: 'templates/liked-deals.html',
        controller: 'LikedDealsCtrl'
      }
    }
  })

  .state('app.response', {
    url: '/responses/:responseId:isExistingChat',
    views: {
      'menuContent': {
        templateUrl: 'templates/response.html',
        controller: 'ResponseCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.other-profile', {
    url: '/other-profile/:userId',
    views: {
      'menuContent': {
        templateUrl: 'templates/other-profile.html',
        controller: 'OtherProfileCtrl'
      }
    }
  })

  .state('app.other-letter', {
    url: '/other-letter/:roomHash',
    views: {
      'menuContent': {
        templateUrl: 'templates/other-letter.html',
        controller: 'OtherLetterCtrl'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  var defaultRoute = '/login';
  if (window.localStorage.getItem('token')) {
    defaultRoute = '/app/home';
  }
  $urlRouterProvider.otherwise(defaultRoute);
});

