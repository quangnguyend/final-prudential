function step1Ctrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.objSpaj = SpajService.getData('spaj')

  gotoPhPage()

  function gotoPhPage () {
    if (!vm.objSpaj) {
      $state.go('app.spaj_start')
    } else if (vm.objSpaj.utama && vm.objSpaj.typeSpaj === 'PemegangPolis') {
      $state.go('app.main')
    } else {
      $state.go('app.notmain')
    }
  }
}
