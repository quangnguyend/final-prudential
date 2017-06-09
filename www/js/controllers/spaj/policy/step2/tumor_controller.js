  function tumorController ($scope, $mdDialog,  $ionicScrollDelegate) {
    var vm = this
    $scope.fakeoption = [

      {
        type: 'a',
        value: 'Red'
      },
      {
        type: 'bewf',
        value: 'Green'
      },
      {
        type: 'cfew',
        value: 'Blue'
      }
    ]
    $scope.mainScroll='abv';
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }
    // popup Tumor
    $scope.puSteps = ['tumor_1'];
    $scope.puNextStep = function (id) {
      var STEP_HEIGHT = 120
      var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
      if ($scope.puSteps.indexOf(id) < 0) $scope.puSteps.push(id)
    }
  }
