function fileService ($rootScope, $ionicLoading, $cordovaCamera, $cordovaImagePicker, $cordovaFileTransfer, DbService, CommonService) {

	var self = this;

	self.takeAPhoto = function($scope, sid, step, key) {
		var options = {
			quality : 50,
			//destinationType: Camera.DestinationType.DATA_URL,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType : Camera.EncodingType.JPEG,
			//targetWidth: 100,
			//targetHeight: 100,
			popoverOptions : CameraPopoverOptions,
			saveToPhotoAlbum : false,
			correctOrientation : true
		};

		$cordovaCamera.getPicture(options).then(function(uri) {
			self.saveFile($scope, sid, step, key, uri);
		}, function(err) {
			CommonService.showAlert("Error", "Fail to take a photo");
		});
	}

	self.browseAFile = function($scope, sid, step, key) {
		var options = {
			maximumImagesCount : 1,
			width : 1280,
			height : 1024,
			quality : 80
		};

		$cordovaImagePicker.getPictures(options).then(function(results) {
			self.saveFile($scope, sid, step, key, results[0]);
		}, function(error) {
			CommonService.showAlert("Error", "Fail to browse a file");
		});
	}

	self.saveFile = function($scope, sid, step, key, uri) {
		if (typeof uri == 'undefined' || uri == null || uri.length == 0) {
			return;
		}

		$ionicLoading.show({
			template : 'Saving... Please wait.'
		});

		var name = uri.substr(uri.lastIndexOf('/') + 1);
		var ext = name.substr(name.lastIndexOf('.') + 1).toLocaleLowerCase();
		if (step == 'step1') {
			key = new Date().getTime() / 1000;
			key = "new_" + Math.floor(key);
		}
		name = ext == "" ? step + "_" + sid + "_" + key + ".jpg" : step + "_" + sid + "_" + key + "." + ext;

		//for ios
		//var targetPath = cordova.file.documentsDirectory + name;
		//for android
		var targetPath = cordova.file.externalApplicationStorageDirectory + name;
		var trustHosts = true
		var options = {};

		$cordovaFileTransfer.download(uri, targetPath, options, trustHosts).then(function(result) {
			var data = DbService.getStep(sid, step);
			if (data != null) {
				if (step == 'step1') {
					for (var i in data.list) {
						if (data.list[i].type == 'image') {
							var image = {
								"path" : targetPath,
								"thumbnail" : targetPath,
								"fid" : key,
								"sync" : 1
							};
							data.list[i].images.push(image);
							$scope.list[i].images.push(image);
							break;
						}
					}
				} else {
					var time = new Date().getTime() / 1000;
					time = Math.floor(time);
					data.files[key].name = name;
					data.files[key].path = targetPath;
					data.files[key].thumbnail = targetPath;
					data.files[key].time = time;
					data.files[key].sync = 1;
					$scope.files = data.files;
				}

				DbService.setStep(sid, step, data);
			}

			$ionicLoading.hide();
			if (step == 'step1' || step == 'step2' || (step == 'step3' && key == 'file_7') || (step == 'step4' && key == 'file_5') || (step == 'step5' && key == 'file_5')) {
				CommonService.showAlert("Success", "Your record will be update. You will be alerted after our review and approval.");
			}
		}, function(error) {
			$ionicLoading.hide();
			CommonService.showAlert("Upload Image", "Fail to save your file. Please try again");
		});
	}

	self.deleteImage = function($scope, sid, step, key) {
		var confirm = CommonService.getConfirm("Delete Image", "Do you want to delete this image ?");
		confirm.then(function(res) {
			if (res) {
				var data = DbService.getStep(sid, step);
				if (data != null) {
					switch (step) {
					case 'step1':
						for (var i in data.list) {
							if (data.list[i].type == 'image') {
								for (var j in data.list[i].images) {
									if (data.list[i].images[j].fid == key) {
										if (key.indexOf('new_') == 0) {
											data.list[i].images.splice(j, 1);
										} else {
											data.list[i].images[j].deleted = 1;
										}
										break;
									}
								}

								for (var j in $scope.list[i].images) {
									if ($scope.list[i].images[j].fid == key) {
										if (key.indexOf('new_') == 0) {
											$scope.list[i].images.splice(j, 1);
										} else {
											$scope.list[i].images[j].deleted = 1;
										}
										break;
									}
								}
								break;
							}
						}
						break;
					}

					DbService.setStep(sid, step, data);
				}
			}
		});
	}

	return self;
}
