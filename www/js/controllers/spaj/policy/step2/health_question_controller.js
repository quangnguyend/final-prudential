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
    eyePopupData: [{
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    }],
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

  vm.rgb= ['red', 'green', 'blue'];
  vm.rgb2= ['red 2', 'green 2', 'blue2'];
  vm.const=[
    {
      type:'a',
      value:'red2'
    },
    {
      type:'bewf',
      value:'green3'
    },
    {
      type:'cfew',
      value:'blue4'
    }
  ]

  vm.checkPropertiesNotNull = function (arrayObj) {
    if (arrayObj === null || arrayObj === '') { return false }
    for (var i = 0; i < arrayObj.length; i++) {
      for (var key in arrayObj[i]) {
        if (!arrayObj[i][key]) return false
      }
    }
    return true
  }

  vm.nextStep = function () {
    vm.healthData.isComplete = validator()
    SpajService.setData('step2', vm.healthData)
    $state.go('app.step3')
  }

  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'main_question' },
    { title: 'Tertanggung Tambahan 1', value: 'additional_insured_1' },
    { title: 'Tertanggung Tambahan 2', value: 'additional_insured_2' }
  ]
  vm.currentTab = 'main_question'
  vm.currentTabIndex = 0

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab
    vm.currentTabIndex = index
  }

  vm.handleSwipe = function (e) {
    var direct = e.gesture.direction
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left' && (vm.currentTabIndex < vm.tabs.length - 1)) {
      var nextTab = vm.tabs[vm.currentTabIndex + 1]['value']
      vm.switchTab(nextTab, vm.currentTabIndex + 1)
    }
    // if swiperight and current tab index bigger than 0
    if (direct === 'right' && vm.currentTabIndex > 0) {
      var prevTab = vm.tabs[vm.currentTabIndex - 1]['value']
      vm.switchTab(prevTab, vm.currentTabIndex - 1)
    }
  }

  vm.showPopupEye = function () {
    // custom popup
    vm.popupData = vm.healthData.eyePopupData
    vm.addPopupData = function () {
      vm.popupData.push({
        name_of_illness: null,
        when_the_condition_found: null,
        last_care_date: null,
        hospoital_name: null,
        hospital_address: null,
        medicine: null
      })
    }
    if (vm.healthData.eye_contact_lenses && vm.healthData.eye_disorders) { // if choose both option
      vm.addPopupData()
    }
    var eyePopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup-eye.html',
      title: 'Detail Kondisi Mata',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return vm.popupData
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return vm.popupData
          }
        }
      ]
    })
    eyePopup.then(function (res) {
      vm.healthData.eyePopupData = res
      vm.eyePopupTouched = true
    })
  }

  function validator () {
    return true
  }

  // Spaj Health 1
  vm.health1Steps = ['health1_step1']
  vm.health1NextStep = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 120
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
    if (vm.health1Steps.indexOf(id) < 0) vm.health1Steps.push(id)
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }
  // popup

  vm.showPopupDigestive = function () {
    var digestivePopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup-digestive.html',
      title: 'Kuesioner Gangguan Saluran Cerna',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return vm.popupData
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return vm.popupData
          }
        }
      ]
    })
    digestivePopup.then(function (res) {
    })
  }

  vm.showPopupRespiratory = function () {
    var respiratoryPopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup_respiratory.html',
      title: 'Kuesioner Gangguan Pernapasan',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return vm.popupData
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return vm.popupData
          }
        }
      ]
    })
    respiratoryPopup.then(function (res) {
    })
  }

  vm.showPopupTumor = function () {
    var tumorPopup = $ionicPopup.show({
      templateUrl: 'views/spaj/policy/step2/popup_tumor.html',
      title: 'Kesehatan Tambahan Tumor',
      cssClass: 'popup-prudential',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-close"></i>',
          type: 'btn-popup-close',
          onTap: function (e) {
            // eyePopup.close();
            return vm.popupData
          }
        },
        {
          text: 'Selesai',
          type: 'button-assertive btn-popup-save',
          onTap: function (e) {
            return vm.popupData
          }
        }
      ]
    })
<<<<<<< HEAD
    tumorPopup.then(function (res) {
=======
    digestive.then(function (res) {
      // vm.healthData.eyePopupData = res
      // vm.eyePopupTouched = true
>>>>>>> 5934edc87ba3d503e132e58e7430aa22128f83e1
    })
  }

}
