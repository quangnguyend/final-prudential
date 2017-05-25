'use strict'

function spajCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this;
  var STEP1_TAB_1 = "Polis", STEP1_TAB_2 = "Utama", STEP1_TAB_3 = "Tambahan";
  var STEP2_TAB_1 = "Utama",
    STEP2_TAB_2 = "Tambahan_1",
    STEP2_TAB_3 = "Tambahan_2";

  // data of policy page
  vm.pageList = [
    {
      step: "1",
      defaultTab: STEP1_TAB_1,
      title: "Policy Holder Information",
      template: "templates/spaj/policy/step1.html",
      valid: false
    },
    {
      step: "2",
      defaultTab: STEP2_TAB_1,
      title: "Health Questions",
      template: "templates/spaj/policy/step2.html",
      valid: false
    },
    {
      step: '3',
      title: 'Prospective Beneficiaries',
      template: '',
      valid: false
    },
    {
      step: '4',
      title: 'Health Questions',
      template: '',
      valid: false
    },
    {
      step: '5',
      title: 'Document Upload',
      template: 'templates/spaj/policy/step5/beneficiaries.html',
      valid: false
    }
  ]

  vm.dataBeneficiary = [
    { name: '', birthday: null, relationship: null, share: '', gender: '' }
  ]

  vm.relationshipData = ['Mother', 'Father', 'Brother', 'Sister']

  vm.insurancePolicies = [
    {
      type_of_insurance: '',
      insurance_company: '',
      sum_assured: '',
      substandard_policy: false
    },
    {
      type_of_insurance: '',
      insurance_company: '',
      sum_assured: '',
      substandard_policy: false
    }
  ]
  vm.typeOfInsurance = [
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 }
  ];

  vm.step1 = "info";
  vm.step2 = "Utama";
  vm.policyStep = "1";
  vm.showStepBar = true;


  vm.nextpagePh = function () {}

  vm.viewStep1 = function(view) {
    vm.step1 = view || vm.step1;
  };


  vm.viewStep2 = function (view) {
    vm.step2 = view || vm.step2
  }

  // handle when user click on bottom button
  vm.submitHandle = function () {
    if (vm.view == POLICY) {
      vm.policy.checker()
    } else if (vm.view == ADDITIONAL) {
      // TODO
    } else if (vm.view == MAIN_ENSURED) {
      // TODO
    }
  }

  // Zone for policy page
  vm.policy = {
    currentTab: STEP1_TAB_1,
    // this function will validate policy step page,
    // then will update the "valid" status, which will enable or disable submit function
    validator: function (step) {
      var pageList = vm.pageList
      function changeValid (step, isValid) {
        pageList.forEach(function (page) {
          if (page.step === step) {
            page.valid = isValid
          }
        })
      }

      switch (step) {
        case '1':
          // TODO
          // EXAMPLE HERE
          // if($scope.policy.firstname !== null && $scope.policy.firstname !== null)
          //   changeValid('1', true)
          // esle
          //   changeValid('1', false)

          changeValid('1', true)
          break
        case '2':
          // TODO
          changeValid('2', true)
          break
        case '3':
          // TODO
          changeValid('3', true)
          break
        case '4':
          // TODO
          changeValid('4', true)
          break
        case '5':
          // TODO
          changeValid('5', true)
          break
        default:
      }
    },

    // this will check validation before move to next step
    checker: function () {
      this.validator(vm.policyStep)
      vm.pageList.forEach(function (page) {
        if (page.step === vm.policyStep && page.valid) {
          vm.policy.nextStep()
        }
      })
    },

    // move to next step
    nextStep: function () {
      vm.policyStep = Number.parseInt(vm.policyStep) < vm.pageList.length
        ? Number.parseInt(vm.policyStep) + 1 + ''
        : vm.policyStep
    },

    // move to special step
    changeStep: function(step) {
      vm.policyStep = step || vm.policyStep;
      var defaultTab = null;
      vm.pageList.forEach(function(page) {
        if (page.step === step) defaultTab = page.defaultTab;
      });
      this.changeTab(defaultTab);
    },

    changeTab: function(tab) {
      this.currentTab = tab;
    },

    beneficiary: {
      addRow: function () {
        vm.dataBeneficiary.push({
          name: '',
          birthday: null,
          relationship: '',
          share: '',
          gender: ''
        })
      },
      setGender: function (rowIndex, gender) {
        vm.dataBeneficiary.forEach(function (row, index) {
          if (index === rowIndex) {
            row.gender = gender
          }
        })
      }
    },
    /* script active insurance page */
    insurancePolicies: [
      {
        type_of_insurance: '',
        insurance_company: '',
        sum_assured: '',
        currency: '',
        substandard_policy: false
      }
    ],
    currencyUnits: [{ name: 'IDR', value: 'IDR' }],
    typeOfInsurance: [
      { name: 'Option 1', value: 1 },
      { name: 'Option 2', value: 2 },
      { name: 'Option 3', value: 3 }
    ],
    addPolicy: function () {
      var policy = {
        type_of_insurance: '',
        insurance_company: '',
        sum_assured: '',
        substandard_policy: false
      }
      vm.policy.insurancePolicies.push(policy)
    },
    changeActiveStatus: function (val, id) {
      document
        .getElementById('active-insurance-yes')
        .classList.remove('button-active')
      document
        .getElementById('active-insurance-no')
        .classList.remove('button-active')
      var $idActive = document.getElementById(id)
      $idActive.className += ' button-active'
    },
    /* document upload page */
    documents: [
      {
        document_name: 'Proof of Identification',
        document_type: '',
        document_image: ''
      },
      {
        document_name: 'Document 2',
        document_type: '',
        document_image: ''
      },
      {
        document_name: 'Document 3',
        document_type: '',
        document_image: ''
      },
      {
        document_name: 'Document 4',
        document_type: '',
        document_image: ''
      }
    ],
    documentType: [{ name: 'Identity Card', value: 1 }],
    toogleStepBar: function () {
      vm.showStepBar = !vm.showStepBar
    }
  }

  // Upload file to server
  $scope.uploadFiles = function (files, item) {
    // console.log(item);
    // console.log(files[0]);
    // var fileFormData  = new FormData();
    // Take the first selected file
    // fileFormData .append("file", files[0]);
    // $scope.testdata = file[0].name;
    /* var uploadUrl = '';
    $http.post(uploadUrl, fileFormData , {
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity
    }).success(function (response) {
      console.log(response);
    }).error(function (response) {
      console.log(response);
    }); */
  }

  $scope.goTo = function (id) {
    $location.hash(id)
    $ionicScrollDelegate.anchorScroll()
  }

  /// Spaj Health 1
  $scope.health1Steps = ['health1_step1']
  $scope.health1NextStep = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 90
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
    if ($scope.health1Steps.indexOf(id) < 0) $scope.health1Steps.push(id)
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }
}
