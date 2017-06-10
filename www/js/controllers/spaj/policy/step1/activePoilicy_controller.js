function activePolicyCtrl($state, $scope, $rootScope, SpajService, $attrs, $timeout) {
  var vm = this



  $timeout(function () {
    var insuredName = $attrs.insuredData
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
    // if (!SpajService.getData('start')) {
    //   SpajService.setData('start', {})
    // }
    // var data = SpajService.getData('start')
    // data[insuredName] = $scope.data

    // $scope.$on('$destroy', function () {
    //   data[insuredName]['isComplete'] = validator()
    // })
  })


}
