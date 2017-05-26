function stepProcessCtr ($scope, $rootScope, UserService, DataService, $location) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  var step = $location.path().split("/")[2].replace(/step/i, '');
  if( step === undefined || step === null || step === 'main' )
    $rootScope.currentStep = '1';
  else{
    $rootScope.currentStep = step;
  }
  vm.policyStep = $rootScope.currentStep;

  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'app.main'},
    { step: '2', title: 'Health Questions', state: 'step2' },
    { step: '3', title: 'Health Questions', state: 'step3' },
    { step: '4', title: 'Payor', state: 'step4' },
    { step: '5', title: 'Beneficiaries', state: 'step5' }]

  vm.changeStep = function (step) {
    vm.policyStep = step;
  }
}
