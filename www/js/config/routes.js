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
      return '/templates/onboard' + $stateParams.onboardStep + '.html';
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
    },
    resolve: {
      recipient: function($stateParams, ChatService) {
        return ChatService.getRecipientName($stateParams.chatId);
      },
      messages: function($stateParams, ChatService) {
        console.log("resolving");
        return ChatService.getMessagesFromBackend($stateParams.chatId);
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

  .state('app.response', {
    url: '/responses/:responseId',
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
  $urlRouterProvider.otherwise('/app/home');
});

