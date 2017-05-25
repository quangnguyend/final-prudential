function step1Ctrl ($scope, $rootScope, $stateParams, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.isPrudential = $stateParams.isPru
  // console.log('sss', vm.isPrudential)
}
