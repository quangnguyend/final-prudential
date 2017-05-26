function phMainCtrl($scope, $rootScope, $stateParams, UserService, DataService, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var POCICY_HOLDER_TAB = 'POLICY_HOLDER', ADDITIONAL_TAB = 'ADDITIONAL'
  $scope.policy_holder_tab = POCICY_HOLDER_TAB
  $scope.additional_tab = ADDITIONAL_TAB
  $scope.currentTab = POCICY_HOLDER_TAB
  $scope.additionalList = []

  $scope.switchTab = function (tab) {
    $scope.currentTab = tab || POCICY_HOLDER_TAB
  }

  $scope.addAdditionalTab = function () {
    var numberTab = $scope.additionalList.length
    // we have only maximum 2 addtional tabs
    if (numberTab === 2) { return }
    $scope.additionalList.push({
      id: 'ADDITIONAL_' + numberTab,
      name: 'Tertanggung Tambahan ' + (numberTab + 1)
    })
  }

  $scope.nextClickHandle = function () {
    console.log(SpajService.getData())
  }
}
