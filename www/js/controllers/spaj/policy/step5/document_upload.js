function documentUploadCtrl ($scope, $rootScope, Upload) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.tabs = [
    {title: 'Pembayar Premi', value: 'premiums'},
    {title: 'Pemegang Polis', value: 'policy_holders'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured'}
  ];
  vm.currentTab = 'premiums';

  vm.switchTab = function (tab) {
    vm.currentTab = tab;
  };

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
  ];

  vm.documentType= [
    { name: 'Kartu Identitas', value: 1 }
  ];
  vm.amendment = '';
  $scope.uploadFiles = function(file, errFiles, item) {
    console.log(file);
    // item.document_image = file.$ngfBlobUrl;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: '',
        data: {file: file}
      });
      file.upload.then(function (response) {
        // upload successful
        item.document_image = response.data;
      }, function (response) {
        // upload error
        /*if (response.status > 0)
         $scope.errorMsg = response.status + ': ' + response.data;*/
      }, function (evt) {
        // upload processing
        /*file.progress = Math.min(100, parseInt(100.0 *
         evt.loaded / evt.total));*/
      });
    }
  };
}
