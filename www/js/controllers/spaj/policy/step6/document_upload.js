function documentUploadCtrl ($ionicPlatform, $scope, $rootScope, $state, SpajService, $cordovaCamera, $ionicModal) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this;
  vm.tabs = [
    {title: 'Pembayar Premi', value: 'premiums'},
    {title: 'Pemegang Polis', value: 'policy_holders'},
    {title: 'Tertanggung Tambahan 1', value: 'additional_insured'}
  ];

  var condition = SpajService.getData('spaj');
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

  vm.data = {};

  vm.tabs.forEach(function (tab) {
    var tabKey = tab.value;
    vm.data[tabKey] = [{
      'document_name': '<Nama dokumen>',
      'document_type': '',
      'document_image': ''
    }];
  });

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab;
    vm.currentTabIndex = index;
  };


  vm.documentType = [
    { name: 'Kartu Identitas', value: 1 }
  ];

  vm.addDocument = function () {
    vm.data[vm.currentTab].push({
      'document_name': '<Nama dokumen>',
      'document_type': '',
      'document_image': ''
    });
  };
  $ionicPlatform.ready(function() {
    vm.isOpeningCamera = false;
    vm.takePhoto =function (item) {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: Camera.PopoverArrowDirection.ARROW_UP,
        saveToPhotoAlbum: false
      };
      if(vm.isOpeningCamera === false){
        vm.isOpeningCamera = true;
        $cordovaCamera.getPicture(options).then(function(imageData) {
          item.document_image = "data:image/jpeg;base64," + imageData;
          vm.isOpeningCamera = false ;
        }, function() {
          return;
        });
      }
    };
  });

  // Modal view image
  vm.modalShowImage = $ionicModal.fromTemplate('<ion-modal-view> ' +
    '<ion-content>' +
    '<div class="pd-20">' +
    '<div class="text-right">' +
    '<button class="button button-assertive" ng-click="vm.closeModalShowImage()"><i class="icon ion-android-close"></i></button>' +
    '</div> ' +
    '<div class="mt-30"><img ng-src="{{dataPopup.document_image}}" class="img-responsive"></div></div></ion-content> ' +
    '</ion-modal-view>', {
      scope: $scope,
      animation: 'slide-in-up',
      hardwareBackButtonClose: true,
      backdropClickToClose :true
    });

  // Close modal view image
  vm.closeModalShowImage = function() {
    vm.modalShowImage.hide();
  };

  vm.viewImage =function (document) {
    $scope.dataPopup = document;
    vm.modalShowImage.show();
  };

  vm.deleteImage =function (document) {
    document.document_image = '';
  };

  function validator () {
    // TODO
    return true
  }

  vm.handleSubmit = function () {
    $state.go('app.step7')
    // TODO
    SpajService.setData('step6', {isComplete: validator()})
  }
}
