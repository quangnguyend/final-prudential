function stepProcessCtr ($scope, $rootScope, UserService, DataService, $location) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.policyStep = $rootScope.policyStep ? $rootScope.policyStep.currentStep : '1'
  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'main' },
    { step: '2', title: 'Health Questions', state: 'step2' },
    { step: '3', title: 'Kegiatan beresiko', state: 'step3' },
    { step: '4', title: 'Pembayar Premi', state: 'step4' },
    { step: '5', title: 'Penerima Manfaat', state: 'step5' },
    { step: '6', title: 'Health Questions', state: 'step6' },
    { step: '7', title: 'Health Questions', state: 'step7' },
    { step: '8', title: 'Payor', state: 'step8' }]

  $rootScope.policyStep = { steps: vm.pageList, currentStep: '1' }

  $rootScope.setCurrentPolicyStep = function (step) {
    $rootScope.policyStep.currentStep = step
  }

  $rootScope.getCurrentPolicyStep = function () {
    return $rootScope.policyStep.currentStep
  }

  $rootScope.getPolicySteps = function () {
    return $rootScope.policyStep.steps
  }

  vm.changeStep = function (step) {
    $rootScope.policyStep.currentStep = step
  }
}
