function phNotMainCtrl ($scope, $state, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var MAIN_INSURED_TAB = 'MAIN_INSURED', MAIN_LAYOUT = 'MAIN_LAYOUT',
    ACTIVE_INSURED = 'ACTIVE_INSURED'

  var rootSpajData = SpajService.getData('spaj')
  $scope.currentLayout = MAIN_LAYOUT
  $scope.main_layout = MAIN_LAYOUT
  $scope.active_insured_layout = ACTIVE_INSURED
  $scope.main_insured_tab = MAIN_INSURED_TAB

  $scope.currentTab = MAIN_INSURED_TAB
  $scope.additionalList = []

  $scope.switchTab = function (tab) {
    $scope.currentTab = tab || MAIN_INSURED_TAB
  }

  $scope.addAdditionalTab = function () {
    var numberTab = $scope.additionalList.length
    // we have only maximum 2 addtional tabs
    if (numberTab === 2) { return }
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
    if ($scope.currentLayout === MAIN_LAYOUT) { $scope.currentLayout = ACTIVE_INSURED } else if ($scope.currentLayout === ACTIVE_INSURED) {
      $state.go('app.step2')
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
