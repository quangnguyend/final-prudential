function insuredHomeCtrl ($scope, $rootScope, $attrs, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $scope.data = {}
  var data = {}
  $timeout(function () {
    var insuredName = $attrs.insuredData
    if (!SpajService.getData(insuredName)) { SpajService.setData(insuredName, {}) }
    data = SpajService.getData(insuredName)
    data.data = $scope.data
  })
}
