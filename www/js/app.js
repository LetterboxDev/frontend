angular.module('letterbox', ['ionic','ionic.service.core', 'letterbox.controllers', 'ngResource', 'letterbox.services', 'letterbox.directives', 'facebook', 'ngCordova', 'angularMoment', 'monospaced.elastic', 'ionic.ion.imageCacheFactory'])

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

angular.module('letterbox.services', []);

