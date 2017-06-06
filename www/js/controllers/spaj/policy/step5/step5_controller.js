function beneficiariesCtrl ($scope, $rootScope, $state, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.dataBeneficiary = [
    { name: '', birthday: null, relationship: null, share: '', gender: '' }
  ]

  vm.beneficiary = {
    addRow: function () {
      vm.dataBeneficiary.push({
        name: '',
        birthday: null,
        relationship: '',
        share: '',
        gender: ''
      })
    },
    setGender: function (rowIndex, gender) {
      vm.dataBeneficiary.forEach(function (row, index) {
        if (index === rowIndex) {
          row.gender = gender
        }
      })
    }
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
