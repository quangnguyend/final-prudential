'use strict'

function familyHistoryCtrl ($scope, $rootScope, $state, $ionicPopup, $ionicScrollDelegate, $location) {
  var vm = this
  $rootScope.customeStep = {
    title: 'RIWAYAT KESEHATAN KELUARGA',
    step: 2
  }
  vm.tabs = [
    {title: 'Tertanggung Utama', value: 'major_insured'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured_1'},
    {title: 'Tertanggung Tambahan 2', value: 'additional_insured_2'}
  ]
  vm.currentTab = 'major_insured'

  vm.switchTab = function (tab) {
    vm.currentTab = tab
  }

  vm.family_history = {
    question: null,
    membersInfo: [
      {
        family_member: '',
        conditions: '',
        age_diagnosis: '',
        type_of_cancer: '',
        type_of_disorder: ''
      }
    ]
  }

  vm.relationshipType = [
    { name: 'Kakek', value: 'Kakek' }
  ]

  vm.setValueQuestion = function (value) {
    vm.family_history.question = value
  }

  vm.addMember = function () {
    var item = {
      family_member: '',
      conditions: '',
      age_diagnosis: '',
      type_of_cancer: '',
      type_of_disorder: ''
    }
    vm.family_history.membersInfo.push(item)
  }
  vm.removeMember=function(){
    vm.family_history.membersInfo.pop()
  }

  // save and redirect to another page
  vm.save = function () {
    $state.go('app.risk_hobby')
  }
}
