function payorOption1Ctrl ($scope, DataService, $ionicScrollDelegate, $location) {
  var vm = this
  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'payor_option0' },
    { title: 'Tertanggung Tambahan 1', value: 'payor_option1' }
  ]
  vm.currentTab = 'payor_option0'

  vm.questions = {
    birplace: ['Option1', 'Option2', 'Option3'],
    homeaddress: ['Option1', 'Option2', 'Option3'],
    agama: ['Option1', 'Option2', 'Option3'],
    pernikahan: ['Option1', 'Option2', 'Option3'],
    kadaluwarsa: ['Option1', 'Option2', 'Option3']
  }

  vm.save = function () {
    $location.path('/app/step4/option1')
  }
}
