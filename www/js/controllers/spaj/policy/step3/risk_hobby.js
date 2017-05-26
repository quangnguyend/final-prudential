'use strict'

function riskHobbyCtrl ($scope, $rootScope, $ionicPopup, UserService, DataService, $ionicScrollDelegate) {
  $rootScope.showBar = true;
  $rootScope.showBack = true;
  $rootScope.showMenu = true;
  var vm = this;
  vm.risk_hobby = {
    question: 1
  };
  vm.setValueQuestion = function (value) {
    vm.risk_hobby.question = value;
  };

}
