function topupPayorCtrl ($state, $scope, $rootScope, $filter, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this;
  var topup_data = SpajService.getData('topup');
  if(typeof topup_data != 'undefined'){
    vm.topup_amount = topup_data.topup_amount;
  }else {
    vm.topup_amount = 0;
  }

  vm.data = {
    type_of_abnormality_suffered: 1,
    work: '',
    department: '',
    position: '',
    total_earnings_per_month: 0,
    total_non_routine_income_per_month: 0,
    purpose_of_top_up_submission: [],
    non_routine_income_source_per_month: [],
    source_of_regular_income_per_month: [],
    business_name: 'PT. ABC',
    business_fields: 'Bisnis Online',
    place_of_business: 'Jl. ABC'
  };
  vm.works = [
    {
      name: 'Pegawai Negeri Sipil/ BUMN/ BUMD/ Perusahaan Negara/ Pejabat Pemerintah', value: 'Pegawai Negeri Sipil/ BUMN/ BUMD/ Perusahaan Negara/ Pejabat Pemerintah'
    }
  ];
  vm.departments = [
    {
      name: 'Select', value: ''
    },
    {
      name: 'Deparment A', value: 'Deparment A'
    },
    {
      name: 'Deparment B', value: 'Deparment B'
    }
  ];
  vm.positions = [
    {
      name: 'Select', value: ''
    },
    {
      name: 'Position A', value: 'Position A'
    },
    {
      name: 'Position B', value: 'Position B'
    }
  ];
  vm.earningRanks = [
    {
      name: '> IDR 5 Juta - IDR 7,5 Juta', value: '> IDR 5 Juta - IDR 7,5 Juta'
    }
  ];
  vm.regular_income = [
    { name: 'Gaji', selected: false },
    { name: 'Laba Perusahaan', selected: false },
    { name: 'Hasil Investasi', selected: false },
    { name: 'Bisnis Pribadi', selected: false },
    { name: 'Lainnya', selected: false }
  ];
  vm.non_routine_income = [
    { name: 'Bonus', selected: false },
    { name: 'Hadiah/warisan', selected: false },
    { name: 'Komisi', selected: false },
    { name: 'Hasil investasi', selected: false },
    { name: 'Lainnya', selected: false },
    { name: 'Penjualan aset', selected: false }
  ];
  vm.purpose_of_top_up_submissions = [
    { name: 'Tabungan', selected: false },
    { name: 'Investasi', selected: false },
    { name: 'Pendidikan', selected: false },
    { name: 'Dana pensiun', selected: false },
    { name: 'Lainnya', selected: false }
  ];

  $scope.$watch('vm.regular_income', function (newVal) {
    var regularIncomeArr = $filter('filter')(newVal, {selected: true});
    vm.data.source_of_regular_income_per_month = [];
    angular.forEach(regularIncomeArr, function(k) {
      this.push(k.name);
    }, vm.data.source_of_regular_income_per_month);
  }, true);

  $scope.$watch('vm.non_routine_income', function (newVal) {
    var nonRoutineIncomeArr = $filter('filter')(newVal, {selected: true});
    vm.data.non_routine_income_source_per_month = [];
    angular.forEach(nonRoutineIncomeArr, function(k) {
      this.push(k.name);
    }, vm.data.non_routine_income_source_per_month);
  }, true);

  $scope.$watch('vm.purpose_of_top_up_submissions', function (newVal) {
    var purposeArr = $filter('filter')(newVal, {selected: true});
    vm.data.purpose_of_top_up_submission = [];
    angular.forEach(purposeArr, function(k) {
      this.push(k.name);
    }, vm.data.purpose_of_top_up_submission);
  }, true);

  vm.next = function () {
    // $state.go('app.topup_payor_detail');
    $rootScope.nextStep()
  }
}
