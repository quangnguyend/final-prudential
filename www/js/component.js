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
  .component('tabBar', {
    transclude: true,
    template: `<div class='row tab-menu'>
      <span ng-repeat='(index, item) in $ctrl.list' ng-click='$ctrl.clickHandle(index)' 
       ng-class='$ctrl.currentTab===index?"active":""' class='col'>{{item.title}}</span>
    </div>`,
    controller: function ($attrs) {
      var ctrl = this
      var list = [
        { title: 'Menu 1', onClick: function () { alert(1) } },
        { title: 'Menu 2', onClick: function () { alert(2) } },
        { title: 'Menu 3', onClick: function () { alert(3) } }
      ]
      ctrl.currentTab = 0
      ctrl.list = $attrs.list || list
      ctrl.clickHandle = function (index) {
        ctrl.currentTab = index
        ctrl.list[ctrl.currentTab].onClick()
      }
    }
  })
  .component('insuredHome', {
    templateUrl: 'views/layout/insured_home.html',
    controller: insuredHomeCtrl
  })
