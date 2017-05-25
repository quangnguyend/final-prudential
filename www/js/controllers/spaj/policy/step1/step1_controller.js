function step1Ctrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.isPrudential = 1

  gotoPhPage()
  // console.log(SpajService.getData('spaj'))

  function gotoPhPage () {
    vm.isPrudential = $stateParams.isPru
    if (vm.isPrudential === '1') {
      $state.go('app.main')
    }
  }
}
