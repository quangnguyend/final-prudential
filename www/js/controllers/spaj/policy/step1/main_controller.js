function phMainCtrl ($scope, $rootScope, $state, $stateParams, UserService, DataService, SpajService, $ionicSideMenuDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $ionicSideMenuDelegate.canDragContent(false)

  var POCICY_HOLDER_TAB = 'POLICY_HOLDER'
  var rootSpajData = SpajService.getData('spaj')
  $scope.policy_holder_tab = POCICY_HOLDER_TAB
  $scope.currentTab = POCICY_HOLDER_TAB
  $scope.additionalList = []
  $scope.currentTabIndex = null

  $scope.switchTab = function (tab, index) {
    $scope.currentTab = tab || POCICY_HOLDER_TAB
    $scope.currentTabIndex = index
  }

  $scope.addAdditionalTab = function () {
    var numberTab = $scope.additionalList.length
    // we have only maximum 2 addtional tabs
    if (numberTab === 2) { return }
    $scope.currentTabIndex = numberTab
    $scope.additionalList.push({
      id: 'ADDITIONAL_' + numberTab,
      name: 'Tertanggung Tambahan ' + (numberTab + 1)
    })
    $scope.currentTab = 'ADDITIONAL_' + numberTab
  }

  $scope.nextClickHandle = function () {
    validator(function (rs) {
      if (rs.indexOf(false) >= 0) {
        SpajService.stepComplete('step1', false)
      } else {
        SpajService.stepComplete('step1', true)
      }
    })
    $state.go('app.step2')
  }

  $scope.handleMainTabSwipe = function () {
    if ($scope.additionalList.length) {
      $scope.switchTab('ADDITIONAL_0', 0)
    }
  }
  $scope.handleAddedTabSwipe = function (e) {
    var direct = e.gesture.direction
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left') {
      if ($scope.additionalList.length === 2 && $scope.currentTabIndex === 0) {
        var nextTab = $scope.additionalList[$scope.currentTabIndex + 1]['id']
        $scope.switchTab(nextTab, $scope.currentTabIndex + 1)
      }
    }
    if (direct === 'right') {
      switch ($scope.currentTabIndex) {
        case 1:
          var prevTab1 = $scope.additionalList[$scope.currentTabIndex - 1]['id']
          $scope.switchTab(prevTab1, $scope.currentTabIndex - 1)
          break
        case 0:
          $scope.switchTab('POLICY_HOLDER', null)
          break
      }
    }
  }

  function initPage (rootSpajData) {
    if (!rootSpajData) return
    if (rootSpajData.tambahan1) { $scope.addAdditionalTab() }
    if (rootSpajData.tambahan2) { $scope.addAdditionalTab() }
  }

  function validator (callback) {
    if (!SpajService.getData('step1')) {
      SpajService.setData('step1', {})
    }

    setTimeout(function () {
      var data = SpajService.getData('step1')
      var rs = Object.keys(data).map(function (page) { return data[page].isComplete })
      callback(rs)
    }, 1500)
  }

  initPage(rootSpajData)
}
