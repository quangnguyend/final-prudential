function step2Ctrl ($state, $scope, $rootScope, $stateParams, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this

  vm.healthData = {
    weight: null,
    height: null,
    smoke_condition: {
      is_smoking: false,
      sticks_cigarettes_per_day: null
    },
    medicin_condition: {
      is_using: false,
      type_of_medicine: null
    },
    another_health_conditions: {
      high_blood_pressure: false,
      increased_cholesterol: false,
      congenital_abnormalities: false,
      abnormalities_of_heart_and_blood_vessels: false,
      stroke: false,
      rheuma: false,
      chest_pain: false,
      nodule_and_tumor: false
    },
    has_brain_related_illness: null,
    has_hormone_or_autoimmune: false,
    eye_condition: {
      is_using_contact_lens: false,
      has_eye_related_illness: false
    }
  }

  $scope.showPopup = function () {
    // custom popup
    var eyePopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup-eye.html',
      title: 'Detail Kondisi Mata',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-ios-arrow-back"></i>',
          type: 'btn-popup-back',
          onTap: function (e) {
            console.log('back clicked');
            e.preventDefault();
          }
        },
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            eyePopup.close();
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            console.log('save clicked!');
          }
        }
      ]
    });
    eyePopup.then(function (res) {
      console.log('Tapped!', res);
    });
  }
}
