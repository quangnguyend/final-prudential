function phMainCtrl ($scope, $rootScope, $stateParams, UserService, DataService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  var vm = this

  vm.Tambahan1 = false;
  vm.Tambahan2 = false;
  vm.tab = 1;
  $scope.active = 1;
  $scope.addTab = function(){
  	if(vm.tab == 1){
  		vm.Tambahan1 = true;	
  		vm.tab += 1;
  		$scope.active = 3;
  	}
  	else{
  		vm.Tambahan2 = true;	
  		vm.tab += 1;
  		$scope.active = 4;
  	}
  }

  vm.viewStep1 = function() {
  	console.log(vm.tab);	
  }

  vm.clickTab = function(active){
  	$scope.active = active;
  }
}
