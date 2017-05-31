function insuredHomeCtrl ($scope, $rootScope, $attrs, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  $scope.data = {}
  var data = {}

  $scope.conditionSelected = false
  $scope.$watch('[conditionSelected]', function(){
    $scope.nextButtonDisabled = !$scope.conditionSelected;
  }, true );

  $scope.getValueButton= function(value){
    $scope.option = value;
  }

  $scope.$watch('[option]', function(){
    $rootScope.dataSave = {
    conditionSelected: $scope.conditionSelected,
    valueButtonSubmit: $scope.option
  }
  }, true );
  //console.log( SpajService.getData('spaj1'));

  $timeout(function () {
    var insuredName = $attrs.insuredData
    $scope.insuredName = insuredName
    if (!SpajService.getData(insuredName)) { SpajService.setData(insuredName, {}) }
    data = SpajService.getData(insuredName)
    data.data = $scope.data
  })
}
