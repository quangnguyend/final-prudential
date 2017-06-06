function beneficiariesCtrl ($scope, $rootScope, $state, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.genderData = ['WANITA']
  vm.relationshipData = ['ISTRI']
  vm.dataBeneficiary = [
    { name: '', birthday: null, relationship: null, share: '', gender: '' }
  ]

  vm.addRow = function () {
    vm.dataBeneficiary.push({
      name: '',
      birthday: null,
      relationship: '',
      share: '',
      gender: ''
    })
    console.log(vm.dataBeneficiary)
  }

  function validator () {
    // TODO
    return true
  }

  vm.handleSubmit = function () {
    $rootScope.nextStep()
    // TODO
    SpajService.setData('beneficiaries', {isComplete: validator()})
  }
}
