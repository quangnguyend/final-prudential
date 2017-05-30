function documentUploadCtrl ($scope, $rootScope, Upload, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.tabs = [
    {title: 'Pembayar Premi', value: 'premiums'},
    {title: 'Pemegang Polis', value: 'policy_holders'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured'}
  ]

  var condition = SpajService.getData('spaj')
  if (typeof condition !== 'undefined') {
    if (condition.utama === true && condition.typeSpaj === 'PemegangPolis') {
      vm.currentTab = 'premiums'
    } else if (condition.typeSpaj === 'PemegangPolis') {
      vm.currentTab = 'policy_holders'
    } else if (condition.typeSpaj === '' && condition.tambahan1 === true) {
      vm.currentTab = 'additional_insured'
    } else {
      vm.currentTab = 'premiums'
    }
  } else {
    vm.currentTab = 'premiums'
  }

  vm.documents = [
    {
      'document_name': 'Bukti Kartu Identitas',
      'document_type': '',
      'document_image': ''
    }, {
      'document_name': '<Nama dokumen>',
      'document_type': '',
      'document_image': ''
    }, {
      'document_name': '<Nama dokumen>',
      'document_type': '',
      'document_image': ''
    }, {
      'document_name': '<Nama dokumen>',
      'document_type': '',
      'document_image': ''
    }
  ]

  vm.documentType = [
    { name: 'Kartu Identitas', value: 1 }
  ]

  $scope.uploadFiles = function (file, errFiles, item) {
    // item.document_image = file.$ngfBlobUrl;
    $scope.errFile = errFiles && errFiles[0]
    if (file) {
      file.upload = Upload.upload({
        url: '',
        data: {file: file}
      })
      file.upload.then(function (response) {
        // upload successful
        item.document_image = response.data
      }, function (response) {
        // upload error
        /* if (response.status > 0)
         $scope.errorMsg = response.status + ': ' + response.data; */
      }, function (evt) {
        // upload processing
        /* file.progress = Math.min(100, parseInt(100.0 *
         evt.loaded / evt.total)); */
      })
    }
  }
}
