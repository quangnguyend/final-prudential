angular.module('prudential.components', [])
  .component('stepProcess', {
    templateUrl: 'views/layout/step_process.html',
    controller: 'StepProcessCtr',
    controllerAs: 'vm'
  })
  .component('stepHeader', {
    templateUrl: 'views/layout/step_header.html',
    controller: 'StepHeaderCtr',
    controllerAs: 'vm'
  })
