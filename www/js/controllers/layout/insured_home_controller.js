function insuredHomeCtrl ($scope, $rootScope, $attrs, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.insuredData = {
    address: [{}]
  }
  vm.addInsuredAddress = function () {
    vm.insuredData.address.push({})
  }
  $scope.data = {}
  var data = {}

  $scope.conditionSelected = false
  $scope.$watch('[conditionSelected]', function () {
    $scope.nextButtonDisabled = !$scope.conditionSelected
  }, true)

  $scope.getValueButton = function (value) {
    $scope.option = value
  }

  $scope.$watch('[option]', function () {
    $rootScope.dataSave = {
      conditionSelected: $scope.conditionSelected,
      valueButtonSubmit: $scope.option
    }
  }, true)
  // console.log( SpajService.getData('spaj1'));

  $timeout(function () {
    var insuredName = $attrs.insuredData
    $scope.insuredName = insuredName
    if (!SpajService.getData(insuredName)) { SpajService.setData(insuredName, {}) }
    data = SpajService.getData(insuredName)
    data.data = $scope.data
  })

  $scope.contacts = [
    {
      tel: { home: '', office: '', gsm: ''}
    }
  ]
  $scope.addContact = function () {
    var tel = {
      tel_home: '',
      tel_office: '',
      tel_gsm: ''
    }
    $scope.contacts.push(tel)
  }
}
