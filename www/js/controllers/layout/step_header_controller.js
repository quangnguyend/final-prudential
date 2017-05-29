function stepHeaderCtr ($scope, $state, $rootScope) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  if (!$rootScope.policyStep) return
  vm.steps = $rootScope.getPolicySteps()
  vm.currentStep = $rootScope.getCurrentPolicyStep()
  $scope.selectStep = vm.currentStep
  $scope.changeStep = function () {
    for (var i in vm.steps) {
      if (vm.steps[i].step === $scope.selectStep) {
        $state.go('app.' + vm.steps[i].state)
        $rootScope.setCurrentPolicyStep($scope.selectStep)
      }
    }
  }
}
