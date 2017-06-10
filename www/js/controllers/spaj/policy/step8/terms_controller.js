
function termsCtrl($state, $scope, $rootScope, $ionicScrollDelegate, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  var step1Validation = SpajService.getData('step1_valid') ? SpajService.getData('step1_valid') : false;
  vm.permission = false
  vm.titleFooter = 'Mohon lengkapi data yang wajib diisi (*) sebelum Anda melanjutkan e-sign'
  var data = SpajService.getData('start')
  //alert(data.toString())
  vm.checkScroll = function () {

    var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top
    var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop

    if (currentTop >= maxTop && step1Validation.isValid == true) {
      document.getElementById('step8_footer').classList.remove('btn-disable')
      vm.permission = true
      vm.titleFooter = 'Saya telah membaca dan menyetujui persyaratan dan ketentuan ini'
    }
  }

  vm.nextToSignature = function () {
    vm.permission && $state.go('app.esign_declaration')
  }
}
