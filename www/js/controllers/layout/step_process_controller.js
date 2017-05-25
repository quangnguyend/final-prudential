function stepProcessCtr ($scope, $rootScope, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.policyStep = '1'
  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'app.main'},
    { step: '2', title: 'Health Questions', state: 'step2' },
    { step: '3', title: 'Health Questions', state: 'step2' },
    { step: '4', title: 'Health Questions', state: 'step2' },
    { step: '5', title: 'Document Upload', state: 'step2' }]

  vm.changeStep = function (step) {
    vm.policyStep = step || vm.policyStep
    vm.pageList.forEach(function (page) {
      if (page.step === step) defaultTab = page.defaultTab
    })
    this.changeTab(defaultTab)
  }
}
