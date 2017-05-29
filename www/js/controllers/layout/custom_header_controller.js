function customHeaderCtrl ($scope, $rootScope, $attrs, $timeout) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $scope.title = $attrs.title
  $rootScope.setCurrentPolicyStep($attrs.step || $rootScope.getCurrentPolicyStep())
}
