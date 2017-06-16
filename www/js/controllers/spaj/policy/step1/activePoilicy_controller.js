function activePolicyCtrl($state, $scope, $rootScope, SpajService) {

  $rootScope.showBar = true
  $rootScope.showBack = false
  $rootScope.showMenu = true
  var MAIN_INSURED_TAB = 'MAIN_INSURED',
    ACTIVE_INSURED = 'ACTIVE_INSURED', POCICY_HOLDER_TAB = 'POLICY_HOLDER'
  var vm = this
  var rootSpajData = SpajService.getData('spaj')
  vm.main_insured_tab = MAIN_INSURED_TAB
  vm.policy_holder_tab = POCICY_HOLDER_TAB
  vm.currentPage = $state.current.name;
  vm.currentTab = vm.main_insured_tab
  vm.additionalList = []
  var insuredName = ''
  $scope.insuredName = insuredName

  vm.policy = {
    apaka: null,
    items: {},
    addActivePolicy: function () {
      var newPolicy = {
        type: '',
        company: '',
        sum: '',
        idr: '',
        substandard: false
      }
      vm.policy.items[insuredName].push(newPolicy)
    }
  }
  vm.policy.options = {
    tipe: [
      { value: 'opion1', name: 'option1' },
      { value: 'opion2', name: 'option2' }
    ],
    substandard: [
      { value: 'opion1', name: 'option1' },
      { value: 'opion2', name: 'option2' }
    ]
  }
  vm.policy.items[insuredName] = [
    {
      type: '',
      company: '',
      sum: '',
      idr: '',
      substandard: false
    }
  ]

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab || MAIN_INSURED_TAB
    vm.currentTabIndex = index || 0
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
  vm.nextClickHandle = function () {
    $rootScope.nextStep()
  }
}
