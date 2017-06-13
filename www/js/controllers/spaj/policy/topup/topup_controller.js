function topupCtrl ($state, $scope, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this;
  vm.data = {
    is_additional_funds: null,
    spaj_number: '',
    type_of_policy_number: '',
    name_of_policy: '',
    policy_number: '',
    name_of_referral_giver: '',
    referral_code_number: '',
    currency: '',
    top_up_amount: '',
    top_up_destination_fund_allocation: [
      {
        type_of_investment_fund: '', investment_fund_percent: ''
      }
    ]
  };
  vm.currencies = [
    {
      name: 'IDR', value: 'IDR'
    },
    {
      name: 'USD', value: 'USD'
    }
  ];
  vm.type_of_investment_fund = [
    {
      name: 'PRUlink Rupiah Equity Fund', value: 'PRUlink Rupiah Equity Fund'
    }
  ];
  vm.addTopUpDestinationFund = function () {
    vm.data.top_up_destination_fund_allocation.push({
      type_of_investment_fund: '', investment_fund_percent: ''
    })
  };
  vm.isShowForm = true;
  vm.checkShowForm = function () {
    if(vm.data.top_up_amount > 250000000){
      vm.isShowForm = true;
    }
    else {
      vm.isShowForm = false;
    }
  };

  vm.valid = true;
  vm.validAdditionalFunds = true;
  vm.changeAdditionValue = function (val) {
    vm.validAdditionalFunds = val;
  }
  vm.next = function () {
    SpajService.setData('topup', {topup_amount: vm.data.top_up_amount});
    SpajService.setData('topup', {isComplete: validator()});
    vm.valid = validator();
    if(vm.data.is_additional_funds == null){
      vm.validAdditionalFunds = false;
    }else{
      vm.validAdditionalFunds = true;
    }
    /*if(vm.valid){
      if(vm.data.is_additional_funds == false){
        $state.go('app.beneficiaries')
      }else{
        $state.go('app.topup_payor')
      }
    }*/
    if(vm.data.is_additional_funds == false){
      $state.go('app.beneficiaries')
    }else{
      $state.go('app.topup_payor')
    }
  }

  function validator () {
    if(vm.data.is_additional_funds == null &&  vm.data.top_up_amount <0){
      return false;
    }else if(vm.data.is_additional_funds == true && vm.data.top_up_amount <= 250000000){
      if(!angular.isNumber(vm.data.spaj_number) ||
        !alphanumeric(vm.data.name_of_policy) ||
        !angular.isNumber(vm.data.policy_number) ||
        !alphanumeric(vm.data.name_of_referral_giver) ||
        !angular.isNumber(vm.data.referral_code_number) ||
        !angular.isNumber(vm.data.top_up_amount)
      ){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  function alphanumeric(inputtxt) {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(inputtxt.match(letterNumber)){
      return true;
    } else {
      return false;
    }
  }

}
