function step2Ctrl($state, $scope, $rootScope, $stateParams, $mdDialog, $ionicScrollDelegate, SpajService, $ionicSideMenuDelegate) {
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
    eyePopup: [{
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    }],
    digesPu: {
      keluhan_perut: null,
      keluhan_muntah: null,
      keluhan_nyerl: null,
      keluhan_mual: null,
      keluhan_darah: null,
      keluhan_lainnya: null,

      pertamas_select: null,
      frekuensi_select: null,
      frekuensi_option: null,
      kapan_keluhan_select: null,
      apakah_pernah: null,
      kapan_month_select: null,
      kapan_year_select: null,
      nama_dokter: null,
      tindakan_operasi: null,
      tindakan_suntikan: null,
      tindakan_obat: [{
        yang: null,
        diperoleh_dari: null,
        timbulnya_select: null,
        timbulnya_option: null,
        mashit: null
      }],
      tindakan_lainnya: null,
      pemeriksaan_waktu: null,
      pemeriksaan_hasil: null,
      lainnya_input: null,
      lainnya_waktu: null
    },
    respiratoryPu: {
      gangguan_asma: null,
      gangguan_tbc: null,
      gangguan_bronkhitis: null,
      gangguan_lainnya: null,
      kapan_pertama: null,
      keluhan_lainnya: null,
      faktor: null,
      apakah: null,
      kapan_keluhan: null,
      nama_dokter: null,
      berapa_select: null,
      terakhir_select: null,
      terakhir_year: null,
      apakah_pernah: null,
      kapan_select: null,
      lama_select: null,
      lama2: null,
      inhalasi: null,
      suntikan: null,
      suntikan_nama: null,
      obat_minum: null,
      operasi: null,
      pengobatan_lainnya: null,
      rontgen: null,
      kapan_select2: null,
      hasil_select: null,
      ekg: null,
      pemeriksaan_lainnya: null
    },
    tumorPopup: {
      janes: {
        tumor: null,
        kista: null,
        benjolan: null,
        kainnya: null
      },
      lokasi: {
        leher: null,
        lengan: null,
        punggung: null,
        lainnya: null
      },
      kapan_pertama: null,
      sudah: null,
      kapan_month_select: null,
      kapan_year_select: null,
      nama_dokter: null,
      angkat_option: null,
      angkat_tipe: null,
      angkat_kapan: null,
      angkat_year: null,
      payudara_lama_select: null,
      payudara_lama_select2: null,
      payudara_hasil_select: null,
      lainnya_value: null,
      kategori_select: null
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
  vm.digestivePopupTouched = false
  vm.tumorPopupTouched = false
  vm.fakeoption = [

    {
      type: 'a',
      value: 'Red2'
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

  vm.nextStep = function () {
    vm.healthData.isComplete = validator()
    SpajService.setData('health_data', vm.healthData)
    $state.go('app.other_health')
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

  function validator() {
    return true
  }

  // Main Health step

  vm.health1NextStep = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 140
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
    $('#' + id).addClass('_active');
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }
  // Popup common function
  vm.closeDialog = function () {
    $mdDialog.hide();
  }

  vm.puNextStep = function (id) {
    $('#' + id).addClass('_active');
    var distance = $('#' + id) && $('#' + id).position().top || 0;
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }

  vm.validateDigestive = function () {
    var cc=$('#digest_part1').length
    var items = vm.healthData.digestivePopupData
    for (var key in items) {
      if (items[key] == null) return false
    }
    return true
  }
  vm.validateTummor = function () {
    var items = vm.healthData.tumorPopupData

    for (var key in items) {
      if (items[key] == null) return false
    }
    return true
  }
  vm.validateEye = function () {
    var items = vm.healthData.eyePopup
    for (i = 0; i < items.length; i++) {
      for (var key in items[i]) {
        if (items[i][key] == null) return false
      }
    }
    return true
  }
  vm.validateRespiratory = function () {
    var items = vm.healthData.respiratoryPopupData
    for (var key in items) {
      if (items[key] == null) return false
    }
    return true
  }

  // ======================== PopupEye ======================== //
  vm.oo = " nguen"
  vm.showPopupEye = function () {
    if (vm.healthData.eye_contact_lenses && vm.healthData.eye_disorders && vm.healthData.eyePopup.length < 2) { // if choose both option
      vm.addPopupEyeItem()
    }
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup-eye.html',
      clickOutsideToClose: true
    }).then(function () {
      vm.eyePopupTouched = true
    })
  }
  vm.addPopupEyeItem = function () {
    vm.healthData.eyePopup.push({
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    })
  }

  // ======================== PopupDigestive ======================== //

  vm.showPopupDigestive = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup-digestive.html',
      clickOutsideToClose: true
    })
      .then(function (res) {
        vm.digestivePopupTouched = true
      })
  }
  vm.digest_addObat = function () {
    vm.healthData.digesPu.tindakan_obat.push({
      yang: null,
      diperoleh_dari: null,
      timbulnya_select: null,
      timbulnya_option: null,
      mashit: null
    })
  }
  // ======================== PopupRespiratory ======================== //

  vm.showPopupRespiratory = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup_respiratory.html',
      clickOutsideToClose: true
    })
    .then(function (res) {
      vm.respiratoryPopupTouched = true
    })
  }

  // ======================== PopupTumor ======================== //
  vm.showPopupTumor = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup_tumor.html',
      clickOutsideToClose: true
    })
    .then(function (res) {
      vm.tumorPopupTouched = true
    })
  }
  vm.resetTumor = function () {
    vm.tumorPopupTouched = false
  }
  // ======================== End PopupTumor ======================== //

}
