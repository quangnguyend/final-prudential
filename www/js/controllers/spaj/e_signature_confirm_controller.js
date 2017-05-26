function eSignatureConfirmCtrl ($scope, $rootScope) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $scope.const = {
    type_of_insurances: [
      {
        type: "Type 1",
        value: "Value 1"
      },
      {
        type: "Type 2",
        value: "Value 2"
      },
      {
        type: "Type 3",
        value: "Value 3"
      }
    ],
    type_of_currencies: [
      {
        type: "Type 1",
        value: "Value 1"
      },
      {
        type: "Type 2",
        value: "Value 2"
      },
      {
        type: "Type 3",
        value: "Value 3"
      }
    ]
  }

  $scope.data = {
    email: null,
    other_information: {
      email: false,
      investation: false,
      form_tambahan_pernafasan: false,
      sumber_pendapatan: false
    },
    policy_array: [{
      insurance_type: "123",
      company: "123",
      sum_insured: "123",
      is_substandard: false
    }]
  }

  $scope.addPolicy = function () {
    let newPolicy = {
      insurance_type: "",
      company: "",
      sum_insured: "",
      is_substandard: false
    }
    $scope.data.policy_array.push(newPolicy)
  }

  $scope.submit = function () {
  }
}