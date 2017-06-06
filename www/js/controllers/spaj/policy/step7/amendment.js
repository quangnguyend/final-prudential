function amendmentCtrl ($scope, $rootScope, SpajService, $state) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.tabs = [
    {title: 'Pembayar Premi', value: 'premiums'},
    {title: 'Pemegang Polis', value: 'policy_holders'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured'}
  ]

  var condition = SpajService.getData('spaj')
  if (typeof condition !== 'undefined') {
    if (condition.utama === true && condition.typeSpaj === 'PemegangPolis') {
      vm.currentTab = 'premiums'
    } else if (condition.typeSpaj === 'PemegangPolis') {
      vm.currentTab = 'policy_holders'
    } else if (condition.typeSpaj === '' && condition.tambahan1 === true) {
      vm.currentTab = 'additional_insured'
    } else {
      vm.currentTab = 'premiums'
    }
  } else {
    vm.currentTab = 'premiums'
  }

  vm.amendment = ''

  function validator () {
    // TODO
    return true
  }

  vm.handleSubmit = function () {
    $rootScope.nextStep()
    // TODO
    SpajService.setData('amendment', {isComplete: validator()})
  }
}
