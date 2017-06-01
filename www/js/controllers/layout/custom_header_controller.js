function customHeaderCtrl ($state, $scope, $rootScope, $attrs, $timeout) {
  var vm = this
  vm.title = $attrs.title
  var currentStep = $attrs.step
  $rootScope.setCurrentPolicyStep(currentStep)
  vm.steps = $rootScope.getPolicySteps()
  if (!$rootScope.policyStep) return
  vm.steps = $rootScope.getPolicySteps()
  vm.currentStep = $rootScope.getCurrentPolicyStep()
  vm.selectStep = vm.currentStep

  vm.selectStep = currentStep
  vm.changeStep = function () {
    for (var i in vm.steps) {
      if (vm.steps[i].step === vm.selectStep) {
        $state.go('app.' + vm.steps[i].state)
        return
      }
    }
  }
}
