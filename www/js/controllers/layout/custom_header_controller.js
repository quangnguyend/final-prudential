function customHeaderCtrl ($state, $scope, $rootScope, $attrs, $timeout) {
  var vm = this
  vm.title = $attrs.title
  // $rootScope.setCurrentPolicyStep(currentStep)
  if (!$rootScope.policyStep) return
  vm.steps = $rootScope.getPolicySteps()
  vm.selectStep = $rootScope.getCurrentPolicyStep()
  vm.changeStep = function () {
    for (var i in vm.steps) {
      if (vm.steps[i].step === vm.selectStep) {
        $rootScope.setCurrentPolicyStep(vm.selectStep)
        $state.go('app.' + vm.steps[i].state)
        return
      }
    }
  }
  
}
