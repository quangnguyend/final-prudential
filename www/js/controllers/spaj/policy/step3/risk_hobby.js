'use strict'

function riskHobbyCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate, $location, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $rootScope.customeStep = {
    title: 'KEGIATAM/AKTIVITAS BERESIKO',
    step: 2
  }
  var vm = this

  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'major_insured' },
    { title: 'Tertanggung Tambahan 1', value: 'additional_insured_1' },
    { title: 'Tertanggung Tambahan 2', value: 'additional_insured_2' }
  ]
  vm.currentTab = 'major_insured'

  vm.switchTab = function (tab) {
    vm.currentTab = tab
  }

  vm.risk_hobby = {
    question: null
  }

  vm.setValueQuestion = function (value) {
    vm.risk_hobby.question = value
  }

  // save and redirect to another page
  vm.save = function () {
    /* Condition
    * If (Policy holder (page 1, section 2: first option: Pemegang Polis)
      or Policy Holder và Main Insured
      or Main Insured.
     * */
    // var condition = SpajService.getData('spaj')
    // if (!condition) {
    //   $rootScope.nextStep()
    //   return
    // }
    // if (condition.utama === true ||
    //     condition.typeSpaj === 'PemegangPolis' ||
    //     (condition.utama === true && condition.typeSpaj === 'PemegangPolis')
    //   ) {
    //   $location.path('/app/step5')
    // } else {
    //   $rootScope.nextStep()
    // }

    // TODO
    SpajService.setData('risk_hobby', {isComplete: validator()})
    $rootScope.nextStep()
  }

  function validator () {
    // TODO
    return true
  }
}
