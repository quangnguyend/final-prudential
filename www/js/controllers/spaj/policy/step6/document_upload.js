function documentUploadCtrl ($ionicPlatform, $scope, $rootScope, $state, SpajService, $cordovaCamera, $ionicModal) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  var spajData = SpajService.getData('spaj')
  var step1 = SpajService.getData('start')

  vm.tabs = []
  vm.tabs = [{name: 'Pembayar premi', id: 'premium_payers'},
    {name: 'Tertanggung utama', id: 'main_issue'}]

  if (typeof spajData !== 'undefined') {
    if (typeof spajData.session2 !== 'undefined' && spajData.session2 === 'lainnya') {
      vm.tabs.push(
        {name: 'Pembayar premi', id: 'premium_payers'},
        {name: 'Tertanggung utama', id: 'main_issue'})
    }
  }

  if (typeof step1 !== 'undefined') {
    if (step1.hasOwnProperty('tabs')) {
      var step1Tabs = step1.tabs
      step1Tabs.forEach(function (tab) {
        vm.tabs.push(tab)
      })
    }
  }

  vm.data = {}
  vm.tabs.forEach(function (tab) {
    var tabKey = tab.id
    vm.data[tabKey] = [{
      'document_name': '',
      'document_type': '',
      'document_image': ''
    }]
  })

  if (typeof vm.tabs[0] !== 'undefined') {
    vm.currentTab = vm.tabs[0].id
  } else {
    vm.currentTab = ''
  }

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab
    vm.currentTabIndex = index
  }

  vm.documentType = [
    { name: 'Kartu Identitas', value: 1 }
  ]

  vm.addDocument = function () {
    vm.data[vm.currentTab].push({
      'document_name': '',
      'document_type': '',
      'document_image': ''
    })
  }
  $ionicPlatform.ready(function () {
    vm.isOpeningCamera = false
    vm.takePhoto = function (item) {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: Camera.PopoverArrowDirection.ARROW_UP,
        saveToPhotoAlbum: true
      }
      if (vm.isOpeningCamera === false) {
        vm.isOpeningCamera = true
        $cordovaCamera.getPicture(options).then(function (imageData) {
          item.document_image = 'data:image/jpeg;base64,' + imageData
          vm.isOpeningCamera = false
        }, function () {

        })
      }
    }
  })

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
      backdropClickToClose: true
    })

  // Close modal view image
  vm.closeModalShowImage = function () {
    vm.modalShowImage.hide()
  }

  vm.viewImage = function (document) {
    $scope.dataPopup = document
    vm.modalShowImage.show()
  }

  vm.deleteImage = function (document) {
    document.document_image = ''
  }

  function validator () {
    // TODO
    return true
  }

  vm.handleSubmit = function () {
    $rootScope.nextStep()
    // TODO
    SpajService.setData('document_upload', {isComplete: validator()})
  }
}
