function topupPayorDetailCtrl ($state, $scope, $rootScope) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.next = function () {
    $rootScope.nextStep()
  }
}
