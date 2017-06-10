function step1Ctrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  var vm = this
  var objSpaj = SpajService.getData('spaj')
  gotoPhPage()

  // reset policy data when come to step 1
  delete $rootScope.policyStep
  function gotoPhPage () {
    if (!objSpaj) {
      $state.go('app.spaj_start')
    } else {
      objSpaj.session2 === 'pemegangpolis' ? $state.go('app.main') : $state.go('app.notmain')
    }
  }
}
