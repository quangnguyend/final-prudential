function topupCtrl ($state, $scope, $rootScope) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.next = function () {
    $state.go('app.topup_payor')
  }
}
