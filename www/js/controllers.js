angular.module('prudential.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $cordovaNetwork, UserService, SyncService, CommonService, DataService) {
    $rootScope.synchronizing = false
    $rootScope.queue = []
    $rootScope.localSync = 0
    $rootScope.serverSync = 0
    $rootScope.failed = 0
    $rootScope.update = []
    $rootScope.updating = 0
    $rootScope.loading = []
    $rootScope.uid = 0
    $rootScope.session = ''
    $rootScope.showBar = true
    $rootScope.showBack = true
    $rootScope.showMenu = true
    $rootScope.init = true
    $rootScope.base_url = 'https://www.headwatersroofinggroup.com'

    UserService.authenticate()

    $scope.logout = function () {
      UserService.logout()
    }

    $scope.exit = function () {
      var confirm = CommonService.getConfirm('Exit', 'Do you want to close this application ?')
      confirm.then(function (res) {
        if (res) {
          if (navigator.app) {
            navigator.app.exitApp()
          } else if (navigator.device) {
            navigator.device.exitApp()
          }
        }
      })
    }

    $scope.sync = function () {
      if ($rootScope.uid > 0 && !$rootScope.synchronizing) {
        SyncService.sync(null)
      }
    }

    setTimeout($scope.sync, 1800000)
  })
  .controller('StepProcessCtr', stepProcessCtr)
  .controller('SpajStartCtrl', spajStartCtrl)

  .controller('Step1Ctrl', step1Ctrl)
  .controller('PhMainCtrl', phMainCtrl)
  .controller('PhNotMainCtrl', phNotMainCtrl)

  .controller('Step2Ctrl', step2Ctrl)
  .controller('OtherHealthCtrl', otherHealthCtrl)
  .controller('FamilyHistoryCtrl', familyHistoryCtrl)
  .controller('RiskHobbyCtrl', riskHobbyCtrl)

  .directive('dataService', dataService)
  .directive('groupedRadio', groupedRadio)
