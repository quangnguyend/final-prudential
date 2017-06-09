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

  vm.next = function () {
    SpajService.setData('topup', {isComplete: validator()});
    if(vm.data.is_additional_funds == false){
      $state.go('app.beneficiaries')
    }else{
      $state.go('app.topup_payor')
    }
  }

  function validator () {
    return true
  }
}
