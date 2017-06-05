function payorCtrl ($scope, $rootScope, $state, DataService, $location) {
  var vm = this
  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'payor_option0' },
    { title: 'Tertanggung Tambahan 1', value: 'payor_option1' }
  ]
  vm.currentTab = 'payor_option0'

  vm.save = function () {
    $state.go('app.payor_premium_detail')
  }
}
