angular.module('prudential.components', [])
  .component('stepProcess', {
    templateUrl: 'views/layout/step_process.html',
    controller: 'StepProcessCtr',
    controllerAs: 'vm'
  })
  .component('insuredHome', {
    templateUrl: 'views/layout/insured_home.html',
    controller: 'insuredHomeCtrl'
  })
  .component('customHeader', {
    templateUrl: 'views/layout/custom_header.html',
    controller: 'CustomHeaderCtrl',
    controllerAs: 'vm'
  })
