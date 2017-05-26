function step1Ctrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.isPrudential = 1

  gotoPhPage()
  // console.log(SpajService.getData('spaj'))

  function gotoPhPage () {
    $state.go('app.main')
    // if (vm.objSpaj.utama && vm.objSpaj.typeSpaj=='PemegangPolis') {
    //   $state.go('app.main')
    // }
    // else {
    //    $state.go('app.notmain')
    // }
  }
}
