function stepProcessCtr ($scope, $rootScope, UserService, DataService, $location) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.policyStep = $rootScope.policyStep ? $rootScope.policyStep.currentStep : '1'
  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'app.main' },
    { step: '2', title: 'Health Questions', state: 'app.step2' },
    { step: '3', title: 'Health Questions', state: 'app.step3' },
    { step: '4', title: 'Payor', state: 'app.step4' },
    { step: '5', title: 'Beneficiaries', state: 'app.step5' }]

  $rootScope.policyStep = { steps: vm.pageList, currentStep: '1' }

  $rootScope.setPolicyStep = function (step) {
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
