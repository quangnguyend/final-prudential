function step2Ctrl ($state, $scope, $rootScope, $stateParams, $ionicPopup, UserService/*, SpajService */) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.healthData = {
    personalAccidentPopupData: {
      function_name: null,
      is_pen_installed: null
    },
    eyePopupData: {
      name: null,
      when: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    }
  }
  vm.eyePopupTouched = false
  vm.personalAccidentPopupTouched = false

  vm.checkPropertiesNotNull = function (obj) {
    if (obj === null || obj === "") { return false }
    for (var key in obj) {
      if (obj[key] === null || obj[key] === "")
        return false;
    }
    return true;
  }

  // vm.nextStep = function () {
  //   SpajService.setData('spaj', vm.healthData)
  //   $state.go('app.spaj_start')
  // }

  $scope.showPopup = function () {
    // custom popup
    $scope.popupData = vm.healthData.eyePopupData;
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
            e.preventDefault();
          }
        },
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return $scope.popupData;
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return $scope.popupData;
          }
        }
      ]
    });
    eyePopup.then(function (res) {
      vm.healthData.eyePopupData = res
      vm.eyePopupTouched = true
    });
  }

  $scope.showPopup_paccident = function () {
    // custom popup
    $scope.popupData = vm.healthData.personalAccidentPopupData;
    var injuryPopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup-personal-accident.html',
      title: 'Kecelakaan Pribadi / Cedera Jangka Panjang',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-ios-arrow-back"></i>',
          type: 'btn-popup-back',
          onTap: function (e) {
            e.preventDefault();
          }
        },
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return $scope.popupData;
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return $scope.popupData;
          }
        }
      ]
    });
    injuryPopup.then(function (res) {
      vm.healthData.personalAccidentPopupData = res
      vm.personalAccidentPopupTouched = true
    });
  }
}

