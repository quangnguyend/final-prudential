'use strict'

function paymentTopupCtrl ($scope, $state, $rootScope, $ionicSideMenuDelegate, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this;
  var topup_data = SpajService.getData('topup');
  vm.data = {
    payment_method: '',
    another_payment_method: '',
    term1: false,
    term2: false
  };
  if(typeof topup_data != 'undefined'){
    vm.topup_value = topup_data.topup_amount;
  }else {
    vm.topup_value = 0;
  }
  vm.isCompleted = false;
  $scope.$watchGroup(['vm.data.payment_method', 'vm.data.term1', 'vm.data.term2' ], function () {
    if(vm.data.payment_method !== '' && vm.data.term1 === true && vm.data.term2 === true){
      vm.isCompleted = true;
    }else{
      vm.isCompleted = false;
    }
  }, true);
  // save and redirect to another page
  vm.save = function () {
    // console.log(vm.data);
    if(vm.isCompleted == true){
      $state.go('app.spaj_remider_before_submit');
    }
  }
}
