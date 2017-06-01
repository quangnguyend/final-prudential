function phMainCtrl ($scope, $rootScope, $state, $stateParams, UserService, DataService, SpajService, $ionicSideMenuDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $ionicSideMenuDelegate.canDragContent(false)

  var vm = this

  var POCICY_HOLDER_TAB = 'POLICY_HOLDER'
  var rootSpajData = SpajService.getData('spaj')

  vm.PH = 'Pemegang Polis - '
  vm.policy_holder_tab = POCICY_HOLDER_TAB
  vm.currentTab = POCICY_HOLDER_TAB
  vm.additionalList = []
  vm.currentTabIndex = null

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab || POCICY_HOLDER_TAB
    vm.currentTabIndex = index
  }

  vm.addAdditionalTab = function () {
    var numberTab = vm.additionalList.length
    // we have only maximum 2 addtional tabs
    if (numberTab === 2) { return }
    vm.currentTabIndex = numberTab
    vm.additionalList.push({
      id: 'ADDITIONAL_' + numberTab,
      name: 'Tertanggung Tambahan ' + (numberTab + 1)
    })
    vm.currentTab = 'ADDITIONAL_' + numberTab
  }

  vm.nextClickHandle = function () {
    validator(function (rs) {
      if (rs.indexOf(false) >= 0) {
        SpajService.stepComplete('step1', false)
      } else {
        SpajService.stepComplete('step1', true)
      }
    })
    $state.go('app.step2')
  }

  vm.handleMainTabSwipe = function () {
    if (vm.additionalList.length) {
      vm.switchTab('ADDITIONAL_0', 0)
    }
  }
  vm.handleAddedTabSwipe = function (e) {
    var direct = e.gesture.direction
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left') {
      if (vm.additionalList.length === 2 && vm.currentTabIndex === 0) {
        var nextTab = vm.additionalList[vm.currentTabIndex + 1]['id']
        vm.switchTab(nextTab, vm.currentTabIndex + 1)
      }
    }
    if (direct === 'right') {
      switch (vm.currentTabIndex) {
        case 1:
          var prevTab1 = vm.additionalList[vm.currentTabIndex - 1]['id']
          vm.switchTab(prevTab1, vm.currentTabIndex - 1)
          break
        case 0:
          vm.switchTab('POLICY_HOLDER', null)
          break
      }
    }
  }

  function initPage (rootSpajData) {
    if (!rootSpajData) {
      $state.go('app.spaj_start')
    } else {
      var typeOfSession = rootSpajData.session1
      if (typeOfSession == 1 || typeOfSession == 2) {
        vm.PH = ''
        for (var i = 0; i < parseInt(typeOfSession); i++) {
          vm.addAdditionalTab()
        }
      }
    }
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
