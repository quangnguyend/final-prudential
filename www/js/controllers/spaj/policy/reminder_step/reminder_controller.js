function reminderCtrl ($scope, $rootScope, $state, SpajService,CommonService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  var listToCheck =
    {
      'POLICY_HOLDER': 'Pemegang Polis',
      'MAIN_INSURED': 'Tertanggung Utama',
      'ADDITIONAL_0': 'Tertanggung Tambahan 1',
      'ADDITIONAL_1': 'Tertanggung Tambahan 2'
    }
  var idListToCheck = Object.keys(listToCheck)
  vm.healthData = SpajService.getData('health_data')
  vm.healthFormValidStatus = {
    is_checked: false,
    null_properties: []
  }

  vm.showData = {}

  vm.data = {
    policy: [{
      insurance_type: '',
      company: '',
      sum_insured: '',
      is_substandard: false
    }],
    healthData: {},
    null_properties: []
  }

  var validateHealthData = function (object, returnObj) {
    var gender= SpajService.getData('gender');
    var obj=Object.assign({}, object);
    if (!obj)  return
    if(obj.smoker==false) {delete obj.sticks_cigarettes}
    if(obj.medication==false) {delete obj.medication_detail}
    if(obj.idisease==false) {delete obj.idisea_others}
    if(obj.iill==false) {delete obj.iill_katarak; delete obj.iill_rabun}
    if(!gender || gender != 'WANITA'){
      delete obj.ipapsmear
      delete obj.ipregnant
      delete obj.isurgery
      delete obj.icomplication
    }
    for (let prop in obj) {
      if (obj[prop] === null || obj[prop] === '') {
        returnObj.null_properties.push(prop)
      }
    }
    returnObj.is_checked = true
  }

  validateHealthData(vm.healthData, vm.healthFormValidStatus)

  vm.const = {
    type_of_insurances: [
      {
        type: 'Type 1',
        value: 'Value 1'
      },
      {
        type: 'Type 2',
        value: 'Value 2'
      },
      {
        type: 'Type 3',
        value: 'Value 3'
      }
    ],
    type_of_currencies: [
      {
        type: 'IDR',
        value: 'IDR'
      },
      {
        type: 'USD',
        value: 'USD'
      },
      {
        type: 'MLR',
        value: 'MLR'
      }
    ],
    model_to_field_name_reference: {
      function_name: 'Bila kecelakaan menyangkut alat gerak, bagaimana fungsi alat gerak tersebut saat ini?',
      is_pen_installed: 'Apakah saat ini terpasang pen pada tubuh Anda?',
      name_of_illness: 'Nama Keadaan/Penyakit',
      when_the_condition_found: 'Kapan kondisi ditemukan',
      last_care_date: 'Tanggal Konsultasi/Perawatan terakhir',
      hospoital_name: 'Nama Rumah sakit yang dikunjungi',
      hospital_address: 'Alamat Rumah sakit yang dikunjungi',
      medicine: 'Tindakan Medis',
      height: 'Tinggi',
      weight: 'Berat',
      smoker: 'Apakah Anda merokok?',
      sticks_cigarettes: 'Sebutkan jumlah batang per hari',
      medication: 'Apakah Anda menggunakan obat-obatan tertentu?',
      medication_detail: 'Sebutkan jenis dan alasan penggunaannya',
      darah: 'Tekanan darah tinggi',
      ipeningkatan: 'Peningkatan Kolesterol',
      ijantung: 'Kelainan Jantung Bawaan** Kelainan Bawaan Lainnya',
      ikelainan: 'Kelainan Jantung & Pembuluh Darah',
      istroke: 'Stroke',
      idemam: 'Demam Rheuma / Penyakit Jantung Rematik',
      inyeri: 'Nyeri Dada',
      inodule: 'Nodule/Tumor/ Kista/ Pembengkakan/Pertumbuhan/pembesaran lainnya (kanker/non-kanker)',
      ibrain: 'Kondisi Terkait Otak, Saraf, Saraf Tulang Belakang',
      ihocmon: 'Kondisi Hormon atau Autoimun',
      // Todo (move to onen object in which contain both ieye and eyePopupData)
      ieye: 'Kondisi mata',
      eye_contact_lenses: 'Rabun jauh dengan menggunakan kacamata softlens',
      eye_disorders: 'Katarak atau kelainan mata lainnya',
      iear: 'Telinga, Hidung & Kondisi Tenggorokan',
      irespiratory: 'Kondisi Pernafasan',
      iheart: 'Kondisi Jantung, Pembuluh Darah atau Darah',
      idigestive: 'Kondisi Sistem Saluran Pencernaan',
      ikidney: 'Kondisi Hati, Ginjal & Saluran Kemih',
      iface: 'Kulit, Kelamin & Alergi',
      ibone: 'Kondisi Tulang, Sendi & Otot',
      itumors: 'Tumor & Pertumbuhan',
      iill: 'Penyakit Infeksi, Penyakit Menular Seksual & AIDS',
      // Todo (move to onen object in which contain both iinjury and personalAccidentPopupData)
      iinjury: 'Kecelakaan Pribadi / Cedera jangka panjang',
      idisease: 'Penyakit lain yang belum disebutkan?',
      idisorder: 'Apakah Calon Tertanggung mempunyai keluhan/kelainan/gangguan pada Payudara atau Prostat?',
      iabnormality: 'Apakah Anda memiliki kelainan pada, Payudara*, Kandungan*, Indung Telur/Ovarium*',
      ipapsmear: 'Apakah Anda pernah melakukan papsmear dengan hasil abnormal',
      ipregnant: 'Apakah saat ini Anda sedang hamil?',
      isurgery: 'Apakah Calon Tertanggung pernah melahirkan dengan cara operasi/Sectio Caesaria karena alasan kesehatan?',
      icomplication: 'Apakah Calon Tertanggung pernah mengalami kesulitan/komplikasi pada saat hamil atau melahirkan?',
      ilostweight: 'Berat Badan waktu Lahir kurang dari atau sama dengan 2500 gram?'
    }
  }

  vm.addPolicy = function () {
    var newPolicy = {
      insurance_type: null,
      company: null,
      sum_insured: null,
      is_substandard: false
    }
    vm.data.policy.push(newPolicy)
  }

  vm.getDisplayText = function (value) {
    return vm.const.model_to_field_name_reference[value]
  }

  vm.submit = function () {
    if (vm.healthFormValidStatus.null_properties > 5) {
      return null // TODO
    } else {
      vm.data.healthData = vm.healthData
      SpajService.setData('reminder_step', vm.data)
    }
  }
  vm.review = function () {
    CommonService.getConfirm('Confirm', 'Send email?')
    //$state.go('app.health_data')
  }

  function checkMissingData () {
   // var healthData = vm.healthData
    var infoData = SpajService.getData('start') || {}
    var missingData = {MAIN_INSURED: []}
    var totalMissing = 0
    Object.keys(infoData).forEach(function (key) {
      if (idListToCheck.indexOf(key) >= 0) {
        // check this field
        missingData[key] = getIncompleteInfo(infoData[key]) || []
        totalMissing = totalMissing + missingData[key].length
      }
    })

    missingData['MAIN_INSURED'] = missingData['MAIN_INSURED'].concat(vm.healthFormValidStatus.null_properties.map(function (field) { return vm.getDisplayText(field) }))
    missingData['MAIN_INSURED'] = missingData['MAIN_INSURED'].filter(function (item) { return !!item })
    totalMissing = totalMissing + vm.healthFormValidStatus.null_properties.length
    missingData.totalMissing = totalMissing
    return missingData
  }

  function getIncompleteInfo (info) {
    // checkList keys depend on varible name of Step 1 (insured_home template)
    // TODO This not enough!! Plz add more
    var checkList = {
      name: 'Missing name',
      date_of_birth: 'Missing date_of_birth',
      address: 'Missing address'
      // ,..... add more
    }

    // return missing datas
    var missingData = Object.keys(checkList).map(function (key) {
      if (!info[key]) {
        return checkList[key]
      }
    })
    missingData = missingData.filter(function (item) { return !!item })
    return missingData
  }
  vm.inCompleteData = checkMissingData()
  vm.inCompleteList = Object.keys(vm.inCompleteData).map(function (key) {
    if (idListToCheck.indexOf(key) >= 0) {
      return {id: key, name: listToCheck[key], data: vm.inCompleteData[key]}
    }
  })

  vm.inCompleteList = vm.inCompleteList.filter(function (item) { return !!item })
  vm.toggle = function (key) {
    vm.showData[key] = !vm.showData[key]
  }
  checkMissingData()
}
