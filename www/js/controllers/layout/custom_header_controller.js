function customHeaderCtrl ($scope, $rootScope, $attrs, $timeout) {
  var vm = this
  vm.title = $attrs.title
  vm.step = $attrs.step
  $rootScope.setCurrentPolicyStep($attrs.step)
}
