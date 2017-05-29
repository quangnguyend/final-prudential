function step2Ctrl ($state, $scope, $rootScope, $stateParams, $ionicPopup, UserService, $ionicScrollDelegate, SpajService, $ionicSideMenuDelegate) {

  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this
  vm.healthData = {
    personalAccidentPopupData: {
      function_name: null,
      is_pen_installed: null
    },
    eyePopupData: {
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    },
    height: null,
    weight: null,
    smoker: null,
    sticks_cigarettes: null,
    medication: null,
    medication_detail: null,
    darah: null,
    ipeningkatan: null,
    ijantung: null,
    ikelainan: null,
    istroke: null,
    idemam: null,
    inyeri: null,
    inodule: null,
    ibrain: null,
    ihocmon: null,
    ieye: null,
    eye_contact_lenses: false,
    eye_disorders: false,
    iear: null,
    irespiratory: null,
    iheart: null,
    idigestive: null,
    ikidney: null,
    iface: null,
    ibone: null,
    itumors: null,
    iill: null,
    iinjury: null,
    idisease: null,
    idisorder: null,
    iabnormality: null,
    ipapsmear: null,
    ipregnant: null,
    isurgery: null,
    icomplication: null,
    ilostweight: null
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

  vm.nextStep = function () {
    SpajService.setData('step2_HealthData', vm.healthData)
    $state.go('app.step3')
  }

  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'main_question' },
    { title: 'Tertanggung Tambahan 1', value: 'additional_insured_1' },
    { title: 'Tertanggung Tambahan 2', value: 'additional_insured_2' }
  ];
  vm.currentTab = 'main_question';
  vm.currentTabIndex = 0;

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab;
    vm.currentTabIndex = index;
  };

  vm.handleSwipe = function (e) {
    var direct = e.gesture.direction;
    //if swipeleft and current tab index smaller than tabs length
    if (direct == 'left' && (vm.currentTabIndex < vm.tabs.length - 1)) {
      var nextTab = vm.tabs[vm.currentTabIndex + 1]['value'];
      vm.switchTab(nextTab, vm.currentTabIndex + 1)
    }
    //if swiperight and current tab index bigger than 0
    if (direct == 'right' && vm.currentTabIndex > 0) {
      var prevTab = vm.tabs[vm.currentTabIndex - 1]['value'];
      vm.switchTab(prevTab, vm.currentTabIndex - 1)
    }
  }

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

  // Spaj Health 1
  $scope.health1Steps = ['health1_step1']
  $scope.health1NextStep = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 120;
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT;
    if ($scope.health1Steps.indexOf(id) < 0) $scope.health1Steps.push(id)
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }
}

