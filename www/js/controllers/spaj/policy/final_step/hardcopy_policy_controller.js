function hardCopyPolicyCtrl ($state, $scope, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.nextPage = function () {
    $state.go('app.spaj_start')
  }
  vm.review = function () {
    $state.go('app.spaj_start')
  }
}