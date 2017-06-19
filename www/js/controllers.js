angular
  .module('prudential.controllers', [])
  .controller('AppCtrl', function (
    $scope,
    $rootScope,
    $cordovaNetwork,
    UserService,
    SyncService,
    CommonService,
    DataService
  ) {
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

    $scope.logout = function () {
      UserService.logout()
    }

    $scope.exit = function () {
      var confirm = CommonService.getConfirm(
        'Exit',
        'Do you want to close this application ?'
      )
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
  })

  //spaj controllers
  .controller('StepProcessCtr', stepProcessCtr)
  .controller('SpajStartCtrl', spajStartCtrl)
  .controller('insuredHomeCtrl', insuredHomeCtrl)
  .controller('EPolicyCtrl', ePolicyCtrl)
  .controller('HardCopyPolicyCtrl', hardCopyPolicyCtrl)
  .controller('ReminderCtrl', reminderCtrl)
  .controller('eSignDeclarationCtrl', eSignDeclarationCtrl)
  .controller('Step1Ctrl', step1Ctrl)
  .controller('PhMainCtrl', phMainCtrl)
  .controller('PhNotMainCtrl', phNotMainCtrl)
  .controller('ActivePolicyCtrl', activePolicyCtrl)
  .controller('Step2Ctrl', step2Ctrl)
  .controller('OtherHealthCtrl', otherHealthCtrl)
  .controller('FamilyHistoryCtrl', familyHistoryCtrl)
  .controller('RiskHobbyCtrl', riskHobbyCtrl)
  .controller('PayorCtrl', payorCtrl)
  .controller('PayorOption1Ctrl', payorOption1Ctrl)
  .controller('BeneficiariesCtrl', beneficiariesCtrl)
  .controller('DocumentUploadCtrl', documentUploadCtrl)
  .controller('AmendmentCtrl', amendmentCtrl)
  .controller('TermsCtrl', termsCtrl)
  .controller('CustomHeaderCtrl', customHeaderCtrl)
  .controller('AddChildCtrl', addChildCtrl)
  .controller('TopupCtrl', topupCtrl)
  .controller('TopupPayorCtrl', topupPayorCtrl)
  .controller('TopupPayorDetailCtrl', topupPayorDetailCtrl)
  .controller('TumorController', tumorController)
  .controller('EyeController', eyeController)
  .controller('DigestiveController', digestiveController)
  .controller('RespiratoryController', respiratoryController)
  .controller('PaymentTopupCtrl', paymentTopupCtrl)

  //sqs controllers
  .controller('SQSStartInsuredOtherCtrl', sqsStartInsuredOtherCtrl)
  .controller('SQSStartPhInsuredCtrl', sqsStartPhInsuredCtrl)
  .controller('SQSStartGoalCtrl', sqsStartGoalCtrl)

  .directive('dataService', dataService)
  .directive('groupedRadio', groupedRadio)
  .directive('spyStyle', [function () {

    return {
      scope: false,
      link: function (scope, element, attrs) {
            //console.log(vm)
            scope.$watch(function () {
                return element.attr('class');
            },  styleChangedCallBack,
            true);
            function styleChangedCallBack(newValue, oldValue) {
                if (newValue !== oldValue) {
                  console.log(newValue)
                  //scope[attrs['spyStyle']](newValue);
                  console.log(element.attr('spy-style'))
                  eval(element.attr('spy-style'))
                }
            }

      }
    };

}]);
