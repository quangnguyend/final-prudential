'use strict'

function paymentTopupCtrl ($scope, $rootScope, $ionicSideMenuDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this;
  vm.data = {
    payment_method: ''
  };
  vm.topup_value = 50000;

  $scope.$watch('vm.data.payment_method', function (newVal) {

  }, true);
  // save and redirect to another page
  vm.save = function () {
    console.log(vm.data);
  }
}
