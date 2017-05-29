'use strict'

function riskHobbyCtrl ($scope, $rootScope, $ionicPopup, $ionicScrollDelegate, $location, SpajService) {
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

    /* Condition
    * If (Policy holder (page 1, section 2: first option: Pemegang Polis)
      or Policy Holder và Main Insured
      or Main Insured.
     * */
    var condition = SpajService.getData('spaj');
    if (typeof condition != 'undefined'){
      if(condition.utama == true ||
        condition.typeSpaj == 'PemegangPolis' ||
        (condition.utama == true && condition.typeSpaj == 'PemegangPolis')
      ){
        $location.path('/app/step5');
      }else{
        $location.path('/app/step4');
      }
    }else{
      $location.path('/app/step4');
    }

  };
}
