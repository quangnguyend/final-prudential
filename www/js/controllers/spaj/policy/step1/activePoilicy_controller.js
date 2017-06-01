function activePolicyCtrl ($state, $scope, $rootScope, $stateParams, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.nextClickHandle = function () {
        $state.go('app.step2')
  }

  vm.policy={
    apaka:null,
    items : [
      {
        type: '',
        company: '',
        sum: '',
        idr: '',
        substandard: false
      }
    ],
    addActivePolicy:function(){
      var newPolicy={
        type: '',
        company: '',
        sum: '',
        idr: '',
        substandard: false
      };
      vm.policy.items.push(newPolicy)
    }
  }
  vm.policy.options={
    tipe: [
      {value: 'opion1', name:'option1'},
      {value: 'opion2', name:'option2'}
    ],
    substandard: [
      {value: 'opion1', name:'option1'},
      {value: 'opion2', name:'option2'}
    ]
  }

  
}
