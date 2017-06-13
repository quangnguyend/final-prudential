// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
  .module('prudential', [
    'ionic',
    'ngAnimate',
    'ui.router',
    'ngCordova',
    'ngFileUpload',
    'ngMaterial',
    'prudential.configs',
    'prudential.controllers',
    'prudential.services',
    'prudential.components',
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
      .state('app.start', {
        cache: false,
        url: '/start',
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
      .state('app.active_policy', {
        cache: false,
        url: '/active_policy',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step1/active_policy.html',
            controller: 'ActivePolicyCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.health_data', {
        cache: false,
        url: '/health_data',
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
      .state('app.other_health', {
        cache: false,
        url: '/other_health',
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
      .state('app.payor_premium', {
        cache: false,
        url: '/payor_premium',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step4/payor.html',
            controller: 'PayorCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.payor_premium_detail', {
        cache: false,
        url: '/payor_premium_detail',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step4/payor_option1.html',
            controller: 'PayorOption1Ctrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.beneficiaries', {
        cache: false,
        url: '/beneficiaries',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step5/beneficiaries.html',
            controller: 'BeneficiariesCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.document_upload', {
        cache: false,
        url: '/document_upload',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step6/document_upload.html',
            controller: 'DocumentUploadCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.amendment', {
        cache: false,
        url: '/amendment',
        views: {
          'menuContent': {
            templateUrl: 'views/spaj/policy/step7/amendment.html',
            controller: 'AmendmentCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.terms_conditions', {
        cache: false,
        url: '/terms_conditions',
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
      .state('app.add_child', {
        cache: false,
        url: '/step2/add_child',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step2/add_child.html',
            controller: 'AddChildCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.topup', {
        cache: false,
        url: '/topup',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step3/top_up.html',
            controller: 'TopupCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.topup_payor', {
        cache: false,
        url: '/topup_payor',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step3/top_up_payor.html',
            controller: 'TopupPayorCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.topup_payor_detail', {
        cache: false,
        url: '/topup_payor_detail',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step3/top_up_payor_detail.html',
            controller: 'TopupPayorDetailCtrl',
            controllerAs: 'vm'
          }
        }
      }).state('app.payment_topup', {
        cache: false,
        url: '/payment_topup',
        views: {
          menuContent: {
            templateUrl: 'views/spaj/policy/step3/payment_topup_cc.html',
            controller: 'PaymentTopupCtrl',
            controllerAs: 'vm'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/spaj_start')
  })
 