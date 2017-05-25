// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('prudential', ['ionic', 'prudential.controllers', 'prudential.services', 'prudential.components', 'ngAnimate', 'ui.router', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault()
      }
    })
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/layout/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.spaj_start', {
        cache: false,
        url: '/spaj_start',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/spaj_start.html',
            controller: 'SpajStartCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step1', {
        cache: false,
        url: '/step1/:isPru',
        views: {
          'menuContent': {
            controller: 'Step1Ctrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.main', {
        cache: false,
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step1/ph_main.html',
            controller: 'PhMainCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.notmain', {
        cache: false,
        url: '/notmain',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step1/ph_not_main.html',
            controller: 'PhNotMainCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step2', {
        cache: false,
        url: '/step2',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step2/health.html',
            controller: 'Step2Ctrl',
            controllerAs: 'vm'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/spaj_start')
  })
