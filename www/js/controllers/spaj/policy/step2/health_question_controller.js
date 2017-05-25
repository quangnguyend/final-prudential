function step2Ctrl($state, $scope, $rootScope, $stateParams, $ionicPopup, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.healthData = {}
  vm.eyePopupTouched = false
  vm.eyePopupData = {
    name: null,
    when: null,
    last_care_date: null,
    hospoital_name: null,
    hospital_address: null,
    medicine: null
  }
  vm.checkPropertiesNotNull = function (obj) {
    if(obj === null || obj === "" ){return false}
    for (var key in obj) {
      if (obj[key] === null || obj[key] === "")
        return false;
    }
    return true;
  }

  $scope.showPopup = function () {
    // custom popup
    $scope.popupData = vm.eyePopupData;
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
      vm.eyePopupData = res
      vm.eyePopupTouched = true
      console.log(vm.eyePopupData)
    });
  }

  
}

