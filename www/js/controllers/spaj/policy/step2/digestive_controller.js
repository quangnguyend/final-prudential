  function digestiveController ($scope, $mdDialog,  $ionicScrollDelegate) {
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
    $scope.addObat = function () {
      $scope.digestive.tindakan_obat.push({
        yang: null,
        diperoleh_dari: null,
        timbulnya_select: null,
        timbulnya_option: null,
        mashit: null
      })
    }
   
    $scope.addPopupData = function () {
      $scope.eyePopupData.push({
        name_of_illness: null,
        when_the_condition_found: null,
        last_care_date: null,
        hospoital_name: null,
        hospital_address: null,
        medicine: null
      })
    }

    $scope.closeDialog = function() {
      $mdDialog.hide();
    }
    // popup Tumor
    $scope.puSteps = ['tumor_1'];
    $scope.puNextStep = function (id) {
      var STEP_HEIGHT = 120
      var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
      if ($scope.puSteps.indexOf(id) < 0) $scope.puSteps.push(id)
      $ionicScrollDelegate.scrollTo(0, distance, true)
    
    }
  }
