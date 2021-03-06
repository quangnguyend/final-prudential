function phNotMainCtrl($scope, $state, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = false
  $rootScope.showMenu = true
  var MAIN_INSURED_TAB = 'MAIN_INSURED',
    ACTIVE_INSURED = 'ACTIVE_INSURED', POCICY_HOLDER_TAB = 'POLICY_HOLDER'
  var vm = this
  var rootSpajData = SpajService.getData('spaj')
  vm.main_insured_tab = MAIN_INSURED_TAB
  vm.policy_holder_tab = POCICY_HOLDER_TAB

  vm.currentTab = MAIN_INSURED_TAB
  vm.additionalList = []

  vm.policy = {
    apaka: null,
    insurancePolicies: [
      {
        type_of_insurance: '',
        insurance_company: '',
        sum_assured: '',
        substandard_policy: false
      }
    ],
    addActivePolicy: function () {
      var newPolicy = {
        type_of_insurance: '',
        insurance_company: '',
        sum_assured: '',
        substandard_policy: false
      }
      vm.policy.insurancePolicies.push(newPolicy)
    }
  }

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab || MAIN_INSURED_TAB
    vm.currentTabIndex = index || 0
  }

  vm.addAdditionalTab = function () {
    var numberTab = vm.additionalList.length
    // we have only maximum 2 addtional tabs
    if (numberTab === 2) { return }
    vm.additionalList.push({
      id: 'ADDITIONAL_' + numberTab,
      name: 'Tertanggung Tambahan ' + (numberTab + 1)
    })
    vm.currentTab = 'ADDITIONAL_' + numberTab
  }



  vm.handleMainTabSwipe = function () {
    vm.switchTab('ADDITIONAL_0', 0)
  }
  vm.handleAddedTabSwipe = function (e) {
    var direct = e.gesture.direction
    var num = vm.additionalList.length
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left') {
      if (num === 1) {
        vm.switchTab(vm.policy_holder_tab, vm.currentTabIndex)
      }
      if (num === 2 && vm.currentTabIndex === 0) {
        var nextTab = vm.additionalList[vm.currentTabIndex + 1]['id']
        vm.switchTab(nextTab, vm.currentTabIndex + 1)
      } else if (num === 2 && vm.currentTabIndex === 1) {
        vm.switchTab(vm.policy_holder_tab, vm.currentTabIndex)
      }
    }
    if (direct === 'right') {
      switch (vm.currentTabIndex) {
        case 1:
          var prevTab1 = vm.additionalList[vm.currentTabIndex - 1]['id']
          vm.switchTab(prevTab1, vm.currentTabIndex - 1)
          break
        case 0:
          vm.switchTab(vm.policy_holder_tab, vm.currentTabIndex)
      }
    }
  }

  function initPage(rootSpajData) {
    if (!rootSpajData) return
    if (rootSpajData.tambahan1) { $scope.addAdditionalTab() }
    if (rootSpajData.tambahan2) { $scope.addAdditionalTab() }
  }

  function validator(callback) {
    if (!SpajService.getData('start')) {
      SpajService.setData('start', {})
    }

    setTimeout(function () {
      var data = SpajService.getData('start')
      var rs = Object.keys(data).map(function (page) { return data[page].isComplete })
      callback(rs)
    }, 1500)
  }

  vm.nextClickHandle = function () {
    var tabs = vm.additionalList
    SpajService.setData('start', { tabs: tabs })
    validator(function (rs) {
      if (rs.indexOf(false) >= 0) {
        SpajService.stepComplete('start', false)
      } else {
        SpajService.stepComplete('start', true)
      }
    })

    $state.go('app.active_policy')
    //$rootScope.nextStep()
  }
  initPage(rootSpajData)
}
