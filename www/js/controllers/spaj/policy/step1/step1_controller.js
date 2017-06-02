function step1Ctrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  var objSpaj = SpajService.getData('spaj')
  gotoPhPage()

  function gotoPhPage () {
    if (!objSpaj) {
      $state.go('app.spaj_start')
    } else {
      console.log(objSpaj)
      objSpaj.session2 === 'pemegangpolis' ? $state.go('app.main') : $state.go('app.notmain')
    }
  }
}
