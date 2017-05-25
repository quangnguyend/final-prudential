
function groupedRadio () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      model: '=ngModel',
      value: '=groupedRadio'
    },
    link: function (scope, element, attrs, ngModelCtrl) {
      element.on('click', function (e) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(scope.value)
        })
      })
      scope.$watch('model', function (newVal) {
        element.removeClass('button-dark')
        if (newVal === scope.value) {
          element.addClass('button-dark')
        }
      })
    }
  }
}