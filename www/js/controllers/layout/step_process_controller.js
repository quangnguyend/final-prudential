function stepProcessCtr ($scope, $rootScope, $state, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.policyStep = '1'
  var payor = [
    { step: '1', title: 'Data Informasi', state: 'step1' },
    { step: '2', title: 'Data Kesehatan', state: 'step2' },
    { step: '3', title: 'Penerima Manfaat ', state: 'step3' },
    { step: '4', title: 'Upload', state: 'step4' },
    { step: '5', title: 'Amendment  ', state: 'step5' }]

  var notPayor = [
    { step: '1', title: 'Data Informasi', state: 'step1' },
    { step: '2', title: 'Data Kesehatan', state: 'step2' },
    { step: '3', title: 'Kegiatan beresiko', state: 'step3' },
    { step: '4', title: 'Pembayar Premi', state: 'step4' },
    { step: '5', title: 'Penerima Manfaat', state: 'step5' },
    { step: '6', title: 'Dokumen', state: 'step6' },
    { step: '7', title: 'Amendment', state: 'step7' }]

  vm.pageList = ($rootScope.typeOfStep === 1) ? payor : notPayor

  $rootScope.policyStep = $rootScope.policyStep ? $rootScope.policyStep : { steps: vm.pageList }

  $rootScope.setCurrentPolicyStep = $rootScope.setCurrentPolicyStep || function (step) {
    $rootScope.policyStep.currentStep = step
  }

  $rootScope.getCurrentPolicyStep = $rootScope.getCurrentPolicyStep || function () {
    return $rootScope.policyStep.currentStep || '1'
  }

  $rootScope.getPolicySteps = $rootScope.getPolicySteps || function () {
    return $rootScope.policyStep.steps
  }

  vm.changeStep = vm.changeStep || function (page) {
    $rootScope.setCurrentPolicyStep(page.step)
    $state.go('app.' + page.state)
  }

  function updateCompleteStatus (step, status) {
    for (var i in vm.pageList) {
      if (vm.pageList[i].state === step) {
        vm.pageList[i].complete = status
      }
    }
  }
  $timeout(function () {
    vm.policyStep = $rootScope.getCurrentPolicyStep()
  })

  this.$onInit = function () {
    SpajService.getStepStatus(function (rs) {
      rs.forEach(function (step) {
        $scope.$apply(function () { updateCompleteStatus(step.step, step.isComplete) })
      })
    })
  }
}
