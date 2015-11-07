// Initialize modules
angular.module('letterbox.controllers', []);
angular.module('letterbox.directives', []);
angular.module('letterbox.services', []);

angular.module('letterbox', ['ionic',
                             'ionic.service.core',
                             'letterbox.controllers',
                             'letterbox.directives',
                             'letterbox.services',
                             'facebook',
                             'angularMoment',
                             'ui.slider',
                             'monospaced.elastic',
                             'ionic.ion.imageCacheFactory',
                             'ngCordova',
                             'ngResource',
                             'ngIOS9UIWebViewPatch'
                            ])

.constant('VERSION', {
  major: 0,
  minor: 1,
  revision: 0  
})

.run(function($ionicPlatform, $rootScope, eventbus) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));

  $ionicPlatform.ready(function() {
    if (window.cordova) {
      var push = new Ionic.Push({
        "pluginConfig": {
          "android": {
            "icon": "notification",
            "iconColor": "#fa5c4f"
          }
        }
      });
      push.register(function(token) {
        window.localStorage.setItem('pushToken', token.token);
        eventbus.call('pushTokenSet');
      });
    }
    if (typeof navigator.splashscreen != 'undefined') {
      navigator.splashscreen.hide();
    }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar && window.cordova.platformId == 'android') {
      window.StatusBar.backgroundColorByHexString('#C84A3F');
    } else if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function(FacebookProvider) {
  FacebookProvider.init('1674828996062928');
});