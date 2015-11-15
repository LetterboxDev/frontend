# Letterbox Frontend [![Build Status](https://travis-ci.org/LetterboxDev/frontend.svg?branch=production)](https://travis-ci.org/LetterboxDev/frontend)

## Stack

- Ionic
- AngularJS
- Cordova

## Getting Started

`sudo npm install -g cordova`

`sudo npm install -g ionic`

`npm install`

`bower install`

`cordova plugin add cordova-plugin-geolocation`

`cordova plugin add ionic-plugin-keyboard`

`cordova plugin add cordova-plugin-statusbar`

`ionic add ionic-platform-web-client`

`cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git`

`cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git`

`cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git`

`ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git`

`cordova plugin add cordova-plugin-vibration`

`ionic plugin add phonegap-plugin-push`

`ionic plugin add https://github.com/katzer/cordova-plugin-local-notifications`

`cordova plugin add cordova-plugin-google-analytics`

**For building for iOS:**

`git clone https://github.com/Wizcorp/phonegap-facebook-plugin.git`

`cordova -d plugin add /path/to/cloned/phonegap-facebook-plugin --variable APP_ID="FACEBOOK_APP_ID" --variable APP_NAME="FACEBOOK_APP_NAME"`

in XCode 7, set Project>Build Settings>All>Build Options>Enable Bitcode = NO

**For building for Android:**

If you currently have the `phonegap-facebook-plugin` installed, run `cordova plugin rm phonegap-facebook-plugin` to remove this plugin, then run `ionic platform rm android` followed by `ionic platform add android` to clear any build cache.

run `ionic plugin add cordova-plugin-facebook4` found from the fix here http://forum.ionicframework.com/t/facebook-native-login-solved-push-notifications-broken/35015/2

To start:
`ionic serve`

## Build

To build iOS:

`ionic build ios`

- Configure TLS for ios9

  - in the plist file, add
  ```
  <key>NSAppTransportSecurity</key>
  <dict>
    <!--Include to allow all connections (DANGER)-->
    <key>NSAllowsArbitraryLoads</key>
        <true/>
  </dict>
  ```

- Fix header search path
  - add `$(OBJROOT)/UninstalledProducts/$(PLATFORM_NAME)/include` to BuildSettings->Header Search Paths

To emulate iOS:

`ionic emulate ios`

To build Android:

`ionic build android`

To emulate Android:

`ionic emulate android`

