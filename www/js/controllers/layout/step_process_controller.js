function stepProcessCtr ($scope, $rootScope, $state, $timeout, SpajService) {
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
    { step: '6', title: 'KELENGKAPAN DOKUMEN', state: 'document_upload' },
    { step: '7', title: 'AMENDMENT', state: 'amendment' }
  ]

  vm.pageList = ($rootScope.typeOfStep === 1) ? payor : notPayor

  $rootScope.policyStep = $rootScope.policyStep ? $rootScope.policyStep : { steps: vm.pageList }

  $rootScope.setCurrentPolicyStep = $rootScope.setCurrentPolicyStep || function (step) {
    //console.log('cr step',$rootScope.policyStep.currentStep)
    $rootScope.policyStep.currentStep = step
    //console.log('cr step later',$rootScope.policyStep.currentStep)
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

  $rootScope.prevStep=function(){
    //alert('ewe')
    var stateName=$state.current.name
    if($rootScope.typeOfStep === 1){
      switch(stateName){
        case 'app.health_data':
          $rootScope.setCurrentPolicyStep(1)
          break;
        case 'app.other_health':
        case 'app.family_history':
        case 'app.risk_hobby':
        case 'app.beneficiaries':
          $rootScope.setCurrentPolicyStep(2)
          break;
        case 'app.document_upload':
          $rootScope.setCurrentPolicyStep(3)
          break;
        case 'app.amendment':
          $rootScope.setCurrentPolicyStep(4)
          break;
      }
    }else{
      switch(stateName){
        case 'app.health_data':
          $rootScope.setCurrentPolicyStep(1)
          break;
        case 'app.other_health':
        case 'app.family_history':
        case 'app.risk_hobby':
        case 'app.payor_premium':
          $rootScope.setCurrentPolicyStep(2)
          break;
        case 'app.payor_premium_detail':
        case 'app.topup':
          $rootScope.setCurrentPolicyStep(3)
          break;
        case 'app.topup_payor':
        case 'app.beneficiaries':
          $rootScope.setCurrentPolicyStep(4)
          break;
        case 'app.document_upload':
          $rootScope.setCurrentPolicyStep(5)
          break;
        case 'app.amendment':
          $rootScope.setCurrentPolicyStep(6)
          break;
      }
    }
  }
  $rootScope.goSpajStart = function () {
    $state.go('app.spaj_start')
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
 
  var oldSoftBack = $rootScope.$ionicGoBack;
  $rootScope.$ionicGoBack = function() {
    $rootScope.prevStep()
    oldSoftBack();
  }
}
