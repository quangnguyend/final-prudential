'use strict'

function riskHobbyCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate, $location) {
  $rootScope.showBar = true;
  $rootScope.showBack = true;
  $rootScope.showMenu = true;

  var vm = this;

  vm.tabs = [
    {title: 'Tertanggung Utama', value: 'major_insured'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured_1'},
    {title: 'Tertanggung Tambahan 2', value: 'additional_insured_2'}
  ];
  vm.currentTab = 'major_insured';

  vm.switchTab = function (tab) {
    vm.currentTab = tab;
  };

  vm.risk_hobby = {
    question: 1
  };

  vm.setValueQuestion = function (value) {
    vm.risk_hobby.question = value;
  };

  // save and redirect to another page
  vm.save = function () {
    // var data = vm.questions;
    // console.log(data);
    $location.path('/app/step4')
  };
}
