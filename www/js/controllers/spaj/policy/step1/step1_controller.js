function step1Ctrl ($state, $scope, $rootScope, $stateParams, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.isPrudential = 1

  gotoPhPage()

  function gotoPhPage () {
    vm.isPrudential = $stateParams.isPru
    if (vm.isPrudential === 1) {
      $state.go('app.main')
    }
  }
}
