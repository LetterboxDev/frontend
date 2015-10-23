angular.module('letterbox', ['ionic', 'letterbox.controllers', 'ngResource', 'letterbox.services', 'letterbox.directives', 'facebook', 'ngCordova', 'angularMoment', 'monospaced.elastic', 'ionic.ion.imageCacheFactory'])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar && window.cordova.platformId == 'android') {
      window.StatusBar.backgroundColorByHexString('#AA3333');
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

