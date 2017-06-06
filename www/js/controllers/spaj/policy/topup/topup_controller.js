function topupCtrl ($state, $scope, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.next = function () {
    SpajService.setData('topup', {isComplete: validator()})
    $state.go('app.topup_payor')
  }

  function validator () {
    return true
  }
}
