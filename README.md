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

`ionic plugin add phonegap-plugin-push`

`cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git`

`cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git`

`cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git`

`ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git`

`cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID="FACEBOOK_APP_ID" --variable APP_NAME="FACEBOOK_APP_NAME"`

Follow the setup at https://github.com/Wizcorp/phonegap-facebook-plugin for the above plugin

To start:
`ionic serve`

## Build

To build iOS:

`ionic build ios`

To emulate iOS:

`ionic emulate ios`

To build Android:

`ionic build android`

To emulate Android:

`ionic emulate android`

