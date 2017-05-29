function reminderCtrl ($scope, $rootScope, $state, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this
  vm.healthData = SpajService.getData('step2_HealthData')

  vm.healthFormValidStatus = {
    is_checked: false,
    null_properties: []
  }

  var tempDataStructure = {
    "personalAccidentPopupData": {
      "function_name": "Bila kecelakaan menyangkut alat gerak, bagaimana fungsi alat gerak tersebut saat ini?",
      "is_pen_installed": true
    },
    "eyePopupData": {
      "name_of_illness": "Nama Keadaan/Penyakit",
      "when_the_condition_found": "Kapan kondisi ditemukan",
      "last_care_date": "Tanggal Konsultati/Perawatan terakhir",
      "hospoital_name": "Nama Rumah sakit yang dikunjungi",
      "hospital_address": "Alamat Rumah sakit yang dikunjungi",
      "medicine": "Tindakan Medis"
    },
    "height": null,
    "weight": null,
    "smoker": 123,
    "sticks_cigarettes": 10,
    "medication": 321,
    "medication_detail": "5",
    "darah": 123,
    "ipeningkatan": null,
    "ijantung": null,
    "ikelainan": null,
    "istroke": null,
    "idemam": false,
    "inyeri": true,
    "inodule": false,
    "ibrain": true,
    "ihocmon": false,
    "ieye": true,
    "eye_contact_lenses": true,
    "eye_disorders": true,
    "iear": true, "irespiratory": true,
    "iheart": true, "idigestive": true,
    "ikidney": true, "iface": true,
    "ibone": true, "itumors": true,
    "iill": true, "iinjury": true,
    "iinjury_option_1": true,
    "idisease": true, "idisorder": true,
    "iabnormality": true, "ipapsmear": true,
    "ipregnant": true, "isurgery": true,
    "icomplication": true, "ilostweight": true
  }

  vm.data = {
    policy: [{
      insurance_type: "",
      company: "",
      sum_insured: "",
      is_substandard: false
    }],
    null_properties: []
  }

  var validateHealthData = function (obj, returnObj) {
    if (obj) {
      for (let prop in obj) {
        // console.log(typeof obj[prop], typeof obj[prop] == 'object')
        // console.log(prop)
        if (typeof obj[prop] === 'object' && obj[prop]) {
          validateHealthData(obj[prop], returnObj)
        }
        else if (obj[prop] === null || obj[prop] === "") {
          returnObj.null_properties.push(prop)
        }
      }
      returnObj.is_checked = true
    }
  }

  validateHealthData(tempDataStructure, vm.healthFormValidStatus)
  console.log(vm.healthFormValidStatus)

  vm.const = {
    type_of_insurances: [
      {
        type: "Type 1",
        value: "Value 1"
      },
      {
        type: "Type 2",
        value: "Value 2"
      },
      {
        type: "Type 3",
        value: "Value 3"
      }
    ],
    type_of_currencies: [
      {
        type: "Type 1",
        value: "Value 1"
      },
      {
        type: "Type 2",
        value: "Value 2"
      },
      {
        type: "Type 3",
        value: "Value 3"
      }
    ],
    model_to_field_name_reference: {
      function_name: "Bila kecelakaan menyangkut alat gerak, bagaimana fungsi alat gerak tersebut saat ini?",
      is_pen_installed: "Apakah saat ini terpasang pen pada tubuh Anda?",
      name_of_illness: "Nama Keadaan/Penyakit",
      when_the_condition_found: "Kapan kondisi ditemukan",
      last_care_date: "Tanggal Konsultasi/Perawatan terakhir",
      hospoital_name: "Nama Rumah sakit yang dikunjungi",
      hospital_address: "Alamat Rumah sakit yang dikunjungi",
      medicine: "Tindakan Medis",
      height: "Tinggi",
      weight: "Berat",
      smoker: "Apakah Anda merokok?",
      sticks_cigarettes: "Sebutkan jumlah batang per hari",
      medication: "Apakah Anda menggunakan obat-obatan tertentu?",
      medication_detail: "Sebutkan jenis dan alasan penggunaannya",
      darah: "Tekanan darah tinggi",
      ipeningkatan: "Peningkatan Kolesterol",
      ijantung: "Kelainan Jantung Bawaan** Kelainan Bawaan Lainnya",
      ikelainan: "Kelainan Jantung & Pembuluh Darah",
      istroke: "Stroke",
      idemam: "Demam Rheuma / Penyakit Jantung Rematik",
      inyeri: "Nyeri Dada",
      inodule: "Nodule/Tumor/ Kista/ Pembengkakan/Pertumbuhan/pembesaran lainnya (kanker/non-kanker)",
      ibrain: "Kondisi Terkait Otak, Saraf, Saraf Tulang Belakang",
      ihocmon: "Kondisi Hormon atau Autoimun",
      //Todo
      ieye: "Kondisi mata",
      eye_contact_lenses: "Rabun jauh dengan menggunakan kacamata softlens",
      eye_disorders: "Katarak atau kelainan mata lainnya",
      iear: "Telinga, Hidung & Kondisi Tenggorokan",
      irespiratory: "Kondisi Pernafasan",
      iheart: "Kondisi Jantung, Pembuluh Darah atau Darah",
      idigestive: "Kondisi Sistem Saluran Pencernaan",
      ikidney: "Kondisi Hati, Ginjal & Saluran Kemih",
      iface: "Kulit, Kelamin & Alergi",
      ibone: "Kondisi Tulang, Sendi & Otot",
      itumors: "Tumor & Pertumbuhan",
      iill: "Penyakit Infeksi, Penyakit Menular Seksual & AIDS",
      //Todo
      iinjury: "Kecelakaan Pribadi / Cedera jangka panjang",
      idisease: "Penyakit lain yang belum disebutkan?",
      idisorder: "Apakah Calon Tertanggung mempunyai keluhan/kelainan/gangguan pada Payudara atau Prostat?",
      iabnormality: "Apakah Anda memiliki kelainan pada, Payudara*, Kandungan*, Indung Telur/Ovarium*",
      ipapsmear: "Apakah Anda pernah melakukan papsmear dengan hasil abnormal",
      ipregnant: "Apakah saat ini Anda sedang hamil?",
      isurgery: "Apakah Calon Tertanggung pernah melahirkan dengan cara operasi/Sectio Caesaria karena alasan kesehatan?",
      icomplication: "Apakah Calon Tertanggung pernah mengalami kesulitan/komplikasi pada saat hamil atau melahirkan?",
      ilostweight: "Berat Badan waktu Lahir kurang dari atau sama dengan 2500 gram?"
    }
  }



  vm.addPolicy = function () {
    let newPolicy = {
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
    if (vm.healthFormValidStatus.null_properties > 5) { return }
    else {
      SpajService.setData('reminder_step', vm)
    }
  }
  vm.review = function () {
    $state.go('app.step2')
  }
}

  // var tempDataStructure = {
  //   "personalAccidentPopupData": {
  //     "function_name": "Bila kecelakaan menyangkut alat gerak, bagaimana fungsi alat gerak tersebut saat ini?",
  //     "is_pen_installed": true
  //   },
  //   "eyePopupData": {
  //     "name_of_illness": "Nama Keadaan/Penyakit",
  //     "when_the_condition_found": "Kapan kondisi ditemukan",
  //     "last_care_date": "Tanggal Konsultati/Perawatan terakhir",
  //     "hospoital_name": "Nama Rumah sakit yang dikunjungi",
  //     "hospital_address": "Alamat Rumah sakit yang dikunjungi",
  //     "medicine": "Tindakan Medis"
  //   },
  //   "height": null,
  //   "weight": null,
  //   "smoker": 123,
  //   "sticks_cigarettes": 10,
  //   "medication": 321,
  //   "medication_detail": "5",
  //   "darah": 123,
  //   "ipeningkatan": null,
  //   "ijantung": true,
  //   "ikelainan": false,
  //   "istroke": true,
  //   "idemam": false,
  //   "inyeri": true,
  //   "inodule": false,
  //   "ibrain": true,
  //   "ihocmon": false,
  //   "ieye": true,
  //   "eye_contact_lenses": true,
  //   "eye_disorders": true,
  //   "iear": true, "irespiratory": true,
  //   "iheart": true, "idigestive": true,
  //   "ikidney": true, "iface": true,
  //   "ibone": true, "itumors": true,
  //   "iill": true, "iinjury": true,
  //   "iinjury_option_1": true,
  //   "idisease": true, "idisorder": true,
  //   "iabnormality": true, "ipapsmear": true,
  //   "ipregnant": true, "isurgery": true,
  //   "icomplication": true, "ilostweight": true
  // }