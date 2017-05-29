function termsCtrl ($scope, $rootScope, $ionicScrollDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.titleFooter = 'Mohon lengkapi data yang wajib diisi (*) sebelum Anda melanjutkan e-sign'
  vm.checkScroll = function () {
    var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top
    var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop

    if (currentTop >= maxTop) {
      document.getElementById('step8_footer').classList.remove('btn-disable')
      vm.titleFooter = 'Saya telah membaca dan menyetujui persyaratan dan ketentuan ini'
    }
  }
}
