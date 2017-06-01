function spajStartCtrl ($state, $scope, $rootScope, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $rootScope.typeOfStep = 0

  var vm = this

  vm.saveSpaj = function () {
    var session1 = vm.data.sessionRadio.toLowerCase()
    var session2 = vm.data.policyRadio.toLowerCase()
    var objSpaj = {
      session1: session1,
      session2: session2
    }

    SpajService.setData('spaj', objSpaj)

    if (session1 === 'utama' && session2 === 'pemegangpolis') { $rootScope.typeOfStep = 1 }
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
    sessionRadio: '',
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
