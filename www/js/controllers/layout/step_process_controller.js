function stepProcessCtr ($scope, $rootScope, UserService, DataService, $location) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  var step = $location.path().split('/')[2].replace(/step/i, '')
  if (step === undefined || step === null || step === 'main') { $rootScope.currentStep = '1' } else {
    $rootScope.currentStep = step
  }
  vm.policyStep = $rootScope.currentStep

  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'app.main'},
    { step: '2', title: 'Health Questions', state: 'step2' },
    { step: '3', title: 'Kegiatan beresiko', state: 'step3' },
    { step: '4', title: 'Pembayar Premi', state: 'step4' },
    { step: '5', title: 'Penerima Manfaat', state: 'step5' },
    { step: '6', title: 'Health Questions', state: 'step6' },
    { step: '7', title: 'Health Questions', state: 'step7' },
    { step: '8', title: 'Payor', state: 'step8' }]

  vm.changeStep = function (step) {
    vm.policyStep = step
  }
}
