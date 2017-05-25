function userService ($rootScope, $http, $location, $ionicLoading, $cordovaProgress) {
	return {
		isLoggedIn : function() {
			if ($rootScope.uid > 0 && $rootScope.session.length > 0) {
				$location.path('/app/list').replace();
			}
		},

		isLoggedOut : function() {
			if ($rootScope.uid == 0 || $rootScope.session.length == 0) {
				$location.path('/app/login').replace();
			}
		},

		authenticate : function() {
			var profile = localStorage.getItem("profile");
			if (profile != null && profile.length > 0) {
				profile = angular.fromJson(profile);
				if (profile.uid > 0 && profile.session.length > 0) {
					$rootScope.uid = profile.uid;
					$rootScope.session = profile.session;
				}
			}
		},

		login : function($scope) {
			var username = typeof $scope.loginData.username == 'undefined' ? "" : $scope.loginData.username.trim();
			var password = typeof $scope.loginData.password == 'undefined' ? "" : $scope.loginData.password.trim();

			if (username.length == 0 || password.length == 0) {
				$scope.error = true;
				$scope.errorMessage = "* Username and password are required !";
			} else {
				$scope.error = false;
				$scope.errorMessage = "";
			}

			if (!$scope.error) {
				$ionicLoading.show({
					template : 'Logging... Please wait.'
				});

				var request = $http({
					method : "post",
					url : $rootScope.base_url + "/api/login",
					crossDomain : true,
					data : {
						username : username,
						password : password
					},
					timeout: 10000,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				});

				request.success(function(data) {
					$ionicLoading.hide();

					if (data.uid > 0 && data.session.length > 0) {
						localStorage.setItem("profile", angular.toJson(data));
						$rootScope.uid = data.uid;
						$rootScope.session = data.session;

						$location.path('/app/list').replace();
					} else {
						$scope.error = true;
						$scope.errorMessage = "* Username or password doesn't match !";
					}
				});

				request.error(function() {
					$scope.error = true;
					$scope.errorMessage = "* No internet connection !";
					$ionicLoading.hide();
				});
			}
		},

		logout : function() {
			localStorage.removeItem("profile");
			$rootScope.uid = 0;
			$rootScope.session = '';
			$location.path('/app/login').replace();
		}
	}
}
