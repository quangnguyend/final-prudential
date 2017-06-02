function phNotMainCtrl ($scope, $state, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var MAIN_INSURED_TAB = 'MAIN_INSURED', MAIN_LAYOUT = 'MAIN_LAYOUT',
    ACTIVE_INSURED = 'ACTIVE_INSURED'
  var vm = this
  var rootSpajData = SpajService.getData('spaj')
  vm.currentLayout = MAIN_LAYOUT
  vm.main_layout = MAIN_LAYOUT
  vm.active_insured_layout = ACTIVE_INSURED
  vm.main_insured_tab = MAIN_INSURED_TAB

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

  vm.switchTab = function (tab) {
    vm.currentTab = tab || MAIN_INSURED_TAB
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

  vm.nextClickHandle = function () {
    validator(function (rs) {
      if (rs.indexOf(false) >= 0) {
        SpajService.stepComplete('step1', false)
      } else {
        SpajService.stepComplete('step1', true)
      }
    })

    if (vm.currentLayout === MAIN_LAYOUT) { $state.go('app.active_policy') } else if (vm.currentLayout === ACTIVE_INSURED) {
      $rootScope.nextStep()
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
