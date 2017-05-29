// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
  .module('prudential', [
    'ionic',
    'prudential.controllers',
    'prudential.services',
    'prudential.components',
    'ngAnimate',
    'ui.router',
    'ngCordova',
    'ngFileUpload'
  ])
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
          menuContent: {
            templateUrl: 'views/spaj/spaj_start.html',
            controller: 'SpajStartCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step1', {
        cache: false,
        url: '/step1',
        views: {
          menuContent: {
            controller: 'Step1Ctrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.main', {
        cache: false,
        url: '/main',
        views: {
          menuContent: {
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
          menuContent: {
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
          menuContent: {
            templateUrl: 'views/spaj/policy/step2/health.html',
            controller: 'Step2Ctrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.e_policy', {
        cache: false,
        url: '/e_policy',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/final_step/e_policy.html',
            controller: 'EPolicyCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.hardcopy_policy', {
        cache: false,
        url: '/hardcopy_policy',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/final_step/hardcopy_policy.html',
            controller: 'HardCopyPolicyCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.spaj_remider_before_submit', {
        cache: false,
        url: '/spaj_remider_before_submit',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/reminder_step/reminder_before_submit.html',
            controller: 'ReminderCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step3', {
        cache: false,
        url: '/step3',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step3/other_health.html',
            controller: 'OtherHealthCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.family_history', {
        cache: false,
        url: '/step3/family_history',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step3/family_history.html',
            controller: 'FamilyHistoryCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.risk_hobby', {
        cache: false,
        url: '/step3/risk_hobby',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step3/risk_hobby.html',
            controller: 'RiskHobbyCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step4_option1', {
        cache: false,
        url: '/step4',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step4/payor.html',
            controller: 'PayorCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step4', {
        cache: false,
        url: '/step4/option1',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step4/payor_option1.html',
            controller: 'PayorOption1Ctrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step5', {
        cache: false,
        url: '/step5',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step5/beneficiaries.html',
            controller: 'BeneficiariesCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step6', {
        cache: false,
        url: '/step6',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step6/document_upload.html',
            controller: 'DocumentUploadCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step7', {
        cache: false,
        url: '/step7',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step7/amendment.html',
            controller: 'AmendmentCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.step8', {
        cache: false,
        url: '/step8',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step8/terms_conditions.html',
            controller: 'TermsCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.esign_declaration', {
        cache: false,
        url: '/esign_declaration',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/esign_declaration.html',
            controller: 'eSignDeclarationCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.esign_payment', {
        cache: false,
        url: '/payment',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/esign_payment.html'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/spaj_start')
  })
