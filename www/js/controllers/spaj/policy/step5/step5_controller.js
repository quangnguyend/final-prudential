function beneficiariesCtrl ($scope, $rootScope, $state, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.genderData = [
    { id: 1, name: 'WANITA' }
  ];
  vm.relationshipData = [{ id: 1, name: 'ISTRI' }]
  vm.dataBeneficiary = [
    { name: '', birthday: new Date(), relationship: '', share: '', gender: '' }
  ]

  vm.addRow = function () {
    vm.dataBeneficiary.push({
      name: '',
      birthday: new Date(),
      relationship: '',
      share: '',
      gender: ''
    })
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
  vm.isValidated = [];
  vm.validateRow = function (item, index) {
    if(item.name == '' || typeof item.birthday == 'undefined' || item.relationship == '' || item.share == ''|| item.gender == ''){
      vm.isValidated[index] = false;
    }else{
      vm.isValidated[index] = true;
    }
  }
}
