'use strict'

function familyHistoryCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate) {
  $rootScope.showBar = true;
  $rootScope.showBack = true;
  $rootScope.showMenu = true;

  var vm = this;
  vm.family_history = {
    question: 1,
    membersInfo: [
      {
        family_member: '',
        conditions: '',
        age_diagnosis: '',
        type_of_cancer: '',
        type_of_disorder: ''
      }
    ]
  };
  vm.relationshipType = [
    { name: 'Kakek', value: 'Kakek' }
  ];
  vm.setValueQuestion = function (value) {
    vm.family_history.question = value;
  };

  vm.addMember = function () {
    var item = {
      family_member: '',
      conditions: '',
      age_diagnosis: '',
      type_of_cancer: '',
      type_of_disorder: ''
    };
    vm.family_history.membersInfo.push(item);
  };
}
