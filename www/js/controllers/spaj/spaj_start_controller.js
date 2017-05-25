function spajStartCtrl ($state, $scope, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.saveSpaj = function () {
    var utama = vm.data.policyHolder.main_primary_insured
    var tambahan1 = vm.data.policyHolder.policy_payor
    var tambahan2 = vm.data.policyHolder.additional_insured
    var bukanTertanggung = vm.data.policyHolder.no_insured

    var typeSpaj = vm.data.policyRadio
    var objSpaj = {
      utama: utama,
      tambahan1: tambahan1,
      tambahan2: tambahan2,
      bukanTertanggung: bukanTertanggung,
      typeSpaj: typeSpaj
    }

    SpajService.setData('spaj', objSpaj)
    $state.go('app.step1')
  }

  vm.data = {
    policyHolder: {
      main_primary_insured: false,
      policy_payor: false,
      additional_insured: false,
      no_insured: false
    },
    policyRadio: '',
    policyOtherText: '',
    beforeProceed_1: {
      title: 'Apakah Anda sebelumnya telah memiliki Polis Asuransi PT Prudential Life Assurance dengan Tertanggung yang sama dalam kondisi Polis tidak aktif (lapsed)/telah dilakukan Penebusan Polis ( Surrendered), atau telah melakukan penurunan Premi lebih dari 25% dari nilai Premi sebelumnya (“Polis Lama”) dalam periode yang kurang dari 365 hari terhitung sejak tanggal SPAJ yang Anda tanda tangani ini?',
      value: false
    },
    beforeProceed_2: {
      title: 'Apakah Anda mengerti kemungkinan dengan adanya konsekuensi-konsekuensi sebagaimana diatur dalam Polis yang timbul sehubungan dengan kondisi Polis Lama Anda dan pengajuan SPAJ ini?',
      value: false
    },
    beforeProceed_3: {
      title: 'Apakah Anda setuju dengan adanya SPAJ ini merupakan pengganti SPAJ yang pernah diajukan sebelumnya dimana Calon Pemegang Polis dan Calon Tertanggung merupakan orang yang sama. Dengan demikian, SAYA setuju Premi yang telah dibayarkan pada SPAJ sebelumnya secara otomatis akan dialihkan ke SPAJ ini. Dalam hal pada SPAJ sebelumnya SAYA melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) atau Surat Kuasa Pendebitan Rekening (SKPR), SAYA mengerti bahwa untuk SPAJ ini, SAYA perlu melampirkan SKPKK atau SKPR baru',
      value: false,
      otherValue: ''
    }
  }

  $scope.validate = function () {
    // To do
  }
}
