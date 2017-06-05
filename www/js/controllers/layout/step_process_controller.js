function stepProcessCtr ($scope, $rootScope, $state, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.policyStep = '1'
  var payor = [
    { step: '1', title: 'DATA INFORMASI', state: 'start' },
    { step: '2', title: 'DATA KESEHATAN', state: 'health_data' },
    { step: '3', title: 'PENERIMA MANFAAT', state: 'beneficiaries' },
    { step: '4', title: 'UPLOAD', state: 'document_upload' },
    { step: '5', title: 'AMENDMENT  ', state: 'amendment' }]

  var notPayor = [
    { step: '1', title: 'DATA INFORMASI', state: 'start' },
    { step: '2', title: 'DATA KESEHATAN', state: 'health_data' },
    { step: '3', title: 'PEMBAYAR PREMI', state: 'payor_premium' },
    { step: '4', title: 'TOP-UP', state: 'topup' },
    { step: '5', title: 'CALON PENERIMA MANFAAT ASURANSI', state: 'beneficiaries' },
    { step: '6', title: 'DOKUMEN', state: 'document_upload' },
    { step: '7', title: 'AMENDMENT', state: 'amendment' }
  ]

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

  $rootScope.nextStep = function () {
    var foundRoute = false
    var nextStep = Number.parseInt($rootScope.getCurrentPolicyStep()) + 1
    var state = getState(nextStep)
    console.log(state)
    if (state) {
      $state.go('app.' + state)
      $rootScope.setCurrentPolicyStep(nextStep + '')
      foundRoute = true
    }
    if (!foundRoute) {
      var finishedState = vm.pageList.length === 7 ? 'terms_conditions' : 'terms_conditions'
      $state.go('app.' + finishedState)
    }
  }

  $rootScope.resetPolicyData = function () {
    delete $rootScope.policyStep
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

  function getState (step) {
    var state
    for (var i in vm.pageList) {
      if (Number.parseInt(vm.pageList[i].step) === Number.parseInt(step)) {
        state = vm.pageList[i].state
        break
      }
    }
    return state
  }
}
