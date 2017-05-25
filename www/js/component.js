angular.module('prudential.components', [])
  .component('stepProcess', {
    templateUrl: 'views/layout/step_process.html',
    controller: 'StepProcessCtr',
    controllerAs: 'vm'
  })
  .component('stepStatus', {
    template: '<button id="step-status" class="up-arrow">Step {{ $ctrl.step }} of {{ $ctrl.totalStep }}</button>',
    controller: function () {
      var ctrl = this
      ctrl.step = 1
      ctrl.totalStep = 10
      // ctrl.toggle = function () { ctrl.show = !ctrl.show }
      // console.log(ctrl)
    }
  })
