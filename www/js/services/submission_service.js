function submissionService ($rootScope, $http, $stateParams, $ionicLoading, DbService, CommonService) {

	var self = this;

	self.getList = function($scope) {
		$scope.list = [];

		var list = DbService.getList($rootScope.uid);
		if ( typeof list != 'undefined' && list != null) {
			$scope.list = list;
		}
	}

	self.getItem = function($scope) {
		$scope.steps = [];

		var steps = DbService.getItem($stateParams.sid);
		if ( typeof steps != 'undefined' && steps != null) {
			$scope.steps = steps;
		} else {

		}
	}

	self.getStep = function($scope, step) {
		var data = DbService.getStep($stateParams.sid, step);

		if ( typeof data != 'undefined' && data != null) {
			$scope.sid = $stateParams.sid;
			$scope.step = step;
			$scope.title = data.title;
			$scope.prev = data.prev;
			$scope.list = data.list;
			$scope.files = data.files;
			$scope.status = data.status;
		} else {

		}
	}

	return self;
}
