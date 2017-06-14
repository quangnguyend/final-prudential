function payorOption1Ctrl ($scope, $rootScope, $state, DataService, $ionicScrollDelegate, $location, SpajService) {
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
    $rootScope.nextStep()
  }
  vm.phones = [
    {
      phone_home : '',
      phone_office : '',
      phone_gsm : ''
    }
  ];
  vm.addPhone = function () {
    vm.phones.push({
      phone_home : '',
      phone_office : '',
      phone_gsm : ''
    });
  };
  vm.pattern={
    textOnly: new RegExp(/^[a-zA-Z\s]*$/),
    nonDesimal: new RegExp(/^\d+\.\d{0,3}$/),
    alphanumeric: new RegExp(/^[a-zA-Z0-9 ]+$/)
  }
  // TODO
  SpajService.setData('payor_premium', {isComplete: validator()})
  function validator () {
    // TODO
    return true
  }
}
