function syncService ($rootScope, $http, $ionicLoading, $cordovaFileTransfer, DbService, CommonService) {
	var self = this;

	self.sync = function($scope) {
		if (!$rootScope.synchronizing) {
			$rootScope.synchronizing = true;
			$ionicLoading.show({
				template : 'Synchronizing... Please wait.'
			});
			var queue = self.getSync();

			if (queue.length > 0) {
				$rootScope.localSync = queue.length;
				for (var i in queue) {
					switch (queue[i].action) {
					case 'upload':
						self.upload(queue[i]);
						break;
					case 'add':
						self.add(queue[i]);
						break;
					case 'delete':
						self.delete(queue[i]);
						break;
					case 'read':
						self.read(queue[i]);
						break;
					}
				}

				setTimeout(self.checkLocalSync, 500);
			} else {
				self.syncServer($scope);
			}
		}
	}

	self.syncServer = function($scope) {
		var request = $http({
			method : "post",
			url : $rootScope.base_url + "/api/list",
			crossDomain : true,
			data : {
				uid : $rootScope.uid,
				session : $rootScope.session,
				type : "platinum_warranty_registration"
			},
			timeout: 10000,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		request.success(function(data) {
			if (data.success == 1) {
				var list = DbService.getList($rootScope.uid);
				DbService.setList($rootScope.uid, data.list);
				if ($scope != null) {
					$scope.list = data.list;
				}

				var queue = [];

				if (list == null) {
					for (var i in data.list) {
						var sync = {
							"action" : "load_item",
							"sid" : data.list[i].sid
						};
						queue.push(sync);
					}
				} else {
					var sids = [];
					for (var i in list) {
						sids.push(list[i].sid);
						if (list[i].status == 1 || list[i].status == 2) {
							var item = DbService.getItem(list[i].sid);
							var step1 = DbService.getStep(list[i].sid, 'step1');
							if (item == null || step1 == null) {
								var sync = {
									"action" : "load_item",
									"type" : "new",
									"sid" : list[i].sid
								};
								queue.push(sync);
							}
						} else {
							var sync = {
								"action" : "load_item",
								"type" : "update",
								"sid" : list[i].sid
							};
							queue.push(sync);
						}
					}

					for (var i in data.list) {
						if (sids.indexOf(data.list[i].sid) == -1) {
							var sync = {
								"action" : "load_item",
								"type" : "new",
								"sid" : data.list[i].sid
							};
							queue.push(sync);
						}
					}
				}

				if (queue.length > 0) {
					$rootScope.serverSync = queue.length;
					for (var i in queue) {
						self.load(queue[i]);
					}

					setTimeout(self.checkServerSync, 500);
				} else {
					$ionicLoading.hide();
					$rootScope.synchronizing = false;

					var result = document.getElementById('sync-result');
					if (typeof result != 'undefined' && result != null) {
						result.innerHTML = 'Your works have been synchronized.';
					}
				}
			} else {
				$ionicLoading.hide();
				$rootScope.synchronizing = false;

				var result = document.getElementById('sync-result');
				if (typeof result != 'undefined' && result != null) {
					result.innerHTML = "Internet connection is too slow or disconnected. The synchronizing hasn't completed.";
				} else {
					commonService.showAlert("Synchronizing has failed", "Internet connection is too slow or disconnected. The synchronizing hasn't completed.");
				}
			}
		});

		request.error(function() {
			$ionicLoading.hide();
			$rootScope.synchronizing = false;

			var result = document.getElementById('sync-result');
			if (typeof result != 'undefined' && result != null) {
				result.innerHTML = "Internet connection is too slow or disconnected. The synchronizing hasn't completed.";
			} else {
				commonService.showAlert("Synchronizing has failed", "Internet connection is too slow or disconnected. The synchronizing hasn't completed.");
			}
		});
	}

	self.checkLocalSync = function() {
		if ($rootScope.localSync <= 0) {
			self.syncServer(null);
		} else {
			setTimeout(self.checkLocalSync, 500);
		}
	}

	self.checkServerSync = function() {
		if ($rootScope.serverSync <= 0) {
			$ionicLoading.hide();
			$rootScope.synchronizing = false;

			var result = document.getElementById('sync-result');
			if ($rootScope.failed > 0) {
				$rootScope.failed = 0;
				if (typeof result != 'undefined' && result != null) {
					result.innerHTML = "Internet connection is too slow or disconnected. The synchronizing hasn't completed.";
				} else {
					commonService.showAlert("Synchronizing has failed", "Internet connection is too slow or disconnected. The synchronizing hasn't completed.");
				}
			} else {
				if (typeof result != 'undefined' && result != null) {
					result.innerHTML = 'Your records have been synchronized.';
				} else {
					commonService.showAlert("Synchronizing has failed", "Internet connection is too slow or disconnected. The synchronizing hasn't completed.");
				}
			}
		} else {
			setTimeout(self.checkServerSync, 500);
		}
	}

	self.load = function(sync) {
		var request = $http({
			method : "post",
			url : $rootScope.base_url + "/api/get",
			crossDomain : true,
			data : {
				uid : $rootScope.uid,
				session : $rootScope.session,
				type : "platinum_warranty_registration",
				sid : sync.sid
			},
			timeout: 10000,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		request.success(function(data) {
			$rootScope.serverSync--;
			if (data.success == 1) {
				DbService.setItem(sync.sid, data.item);

				DbService.setStep(sync.sid, 'contact', data.contact);

				var comment = DbService.getStep(sync.sid, 'comment');
				DbService.setStep(sync.sid, 'comment', data.comment);

				var files = [];

				var step1 = DbService.getStep(sync.sid, 'step1');

				if (step1 != null) {
					var fids = [];
					var paths = {};
					var thumbnails = {};
					for (var i in step1.list) {
						if (step1.list[i].type == 'image') {
							for (var j in step1.list[i].images) {
								if (step1.list[i].images[j].path != '' && step1.list[i].images[j].path.indexOf('http') != 0) {
									fids.push(step1.list[i].images[j].fid);
									paths[step1.list[i].images[j].fid] = step1.list[i].images[j].path;
									thumbnails[step1.list[i].images[j].fid] = step1.list[i].images[j].thumbnail;
								}
							}
							break;
						}
					}

					for (var i in data.step1.list) {
						if (data.step1.list[i].type == 'image') {
							for (var j in data.step1.list[i].images) {
								if (fids.indexOf(data.step1.list[i].images[j].fid) == -1) {
									var thumbnail = {
										"sid" : sync.sid,
										"step" : "step1",
										"key" : data.step1.list[i].images[j].fid,
										"uri" : data.step1.list[i].images[j].thumbnail
									};
									files.push(thumbnail);
								} else {
									data.step1.list[i].images[j].path = paths[data.step1.list[i].images[j].fid];
									data.step1.list[i].images[j].thumbnail = thumbnails[data.step1.list[i].images[j].fid];
								}
							}
							break;
						}
					}
				} else {
					for (var i in data.step1.list) {
						if (data.step1.list[i].type == 'image') {
							for (var j in data.step1.list[i].images) {
								var thumbnail = {
									"sid" : sync.sid,
									"step" : "step1",
									"key" : data.step1.list[i].images[j].fid,
									"uri" : data.step1.list[i].images[j].thumbnail
								};
								files.push(thumbnail);
							}
							break;
						}
					}
				}

				DbService.setStep(sync.sid, 'step1', data.step1);

				var step2 = DbService.getStep(sync.sid, 'step2');
				if (step2 != null) {
					for (var key in data.step2.files) {
						if (step2.files[key].thumbnail == '' || step2.files[key].thumbnail.indexOf('http') == 0 || step2.files[key].time < data.step2.files[key].time || (data.step2.status > 0 && step2.status == 0)) {
							if (data.step2.files[key].thumbnail != '') {
								var thumbnail = {
									"sid" : sync.sid,
									"step" : "step2",
									"key" : key,
									"time": data.step2.files[key].time,
									"uri" : data.step2.files[key].thumbnail
								};
								files.push(thumbnail);
							}
						} else {
							data.step2.files[key].path = step2.files[key].path;
							data.step2.files[key].thumbnail = step2.files[key].thumbnail;
						}
					}
				} else {
					for (var key in data.step2.files) {
						if (data.step2.files[key].thumbnail != '') {
							var thumbnail = {
								"sid" : sync.sid,
								"step" : "step2",
								"key" : key,
								"time": data.step2.files[key].time,
								"uri" : data.step2.files[key].thumbnail
							};
							files.push(thumbnail);
						}
					}
				}

				DbService.setStep(sync.sid, 'step2', data.step2);

				var step3 = DbService.getStep(sync.sid, 'step3');
				if (step3 != null) {
					for (var key in data.step3.files) {
						if (step3.files[key].thumbnail == '' || step3.files[key].thumbnail.indexOf('http') == 0 || step3.files[key].time < data.step3.files[key].time || (data.step3.files[key].status == 1 && step3.files[key].status == 0)) {
							if (data.step3.files[key].thumbnail != '') {
								var thumbnail = {
									"sid" : sync.sid,
									"step" : "step3",
									"key" : key,
									"time": data.step3.files[key].time,
									"uri" : data.step3.files[key].thumbnail
								};
								files.push(thumbnail);
							}
						} else {
							data.step3.files[key].path = step3.files[key].path;
							data.step3.files[key].thumbnail = step3.files[key].thumbnail;
						}
					}
				} else {
					for (var key in data.step3.files) {
						if (data.step3.files[key].thumbnail != '') {
							var thumbnail = {
								"sid" : sync.sid,
								"step" : "step3",
								"key" : key,
								"time": data.step3.files[key].time,
								"uri" : data.step3.files[key].thumbnail
							};
							files.push(thumbnail);
						}
					}
				}
				DbService.setStep(sync.sid, 'step3', data.step3);

				var step4 = DbService.getStep(sync.sid, 'step4');
				if (step4 != null) {
					for (var key in data.step4.files) {
						if (step4.files[key].thumbnail == '' || step4.files[key].thumbnail.indexOf('http') == 0 || step4.files[key].time < data.step4.files[key].time || (data.step4.files[key].status == 1 && step4.files[key].status == 0)) {
							if (data.step4.files[key].thumbnail != '') {
								var thumbnail = {
									"sid" : sync.sid,
									"step" : "step4",
									"key" : key,
									"time": data.step4.files[key].time,
									"uri" : data.step4.files[key].thumbnail
								};
								files.push(thumbnail);
							}
						} else {
							data.step4.files[key].path = step4.files[key].path;
							data.step4.files[key].thumbnail = step4.files[key].thumbnail;
						}
					}
				} else {
					for (var key in data.step4.files) {
						if (data.step4.files[key].thumbnail != '') {
							var thumbnail = {
								"sid" : sync.sid,
								"step" : "step4",
								"key" : key,
								"time": data.step4.files[key].time,
								"uri" : data.step4.files[key].thumbnail
							};
							files.push(thumbnail);
						}
					}
				}
				DbService.setStep(sync.sid, 'step4', data.step4);

				var step5 = DbService.getStep(sync.sid, 'step5');
				if (step5 != null) {
					for (var key in data.step5.files) {
						if (step5.files[key].thumbnail == '' || step5.files[key].thumbnail.indexOf('http') == 0 || step5.files[key].time < data.step5.files[key].time || (data.step5.files[key].status == 1 && step5.files[key].status == 0)) {
							if (data.step5.files[key].thumbnail != '') {
								var thumbnail = {
									"sid" : sync.sid,
									"step" : "step5",
									"key" : key,
									"time": data.step5.files[key].time,
									"uri" : data.step5.files[key].thumbnail
								};
								files.push(thumbnail);
							}
						} else {
							data.step5.files[key].path = step5.files[key].path;
							data.step5.files[key].thumbnail = step5.files[key].thumbnail;
						}
					}
				} else {
					for (var key in data.step5.files) {
						if (data.step5.files[key].thumbnail != '') {
							var thumbnail = {
								"sid" : sync.sid,
								"step" : "step5",
								"key" : key,
								"time": data.step5.files[key].time,
								"uri" : data.step5.files[key].thumbnail
							};
							files.push(thumbnail);
						}
					}
				}
				DbService.setStep(sync.sid, 'step5', data.step5);

				for (var i in files) {
					self.loadFile(files[i]);
				}
			}
		});

		request.error(function() {
			$rootScope.serverSync--;
			$rootScope.failed++;
		});
	}

	self.loadFile = function(sync) {
		var name = sync.uri.substr(sync.uri.lastIndexOf('/') + 1);
		var ext = name.substr(name.lastIndexOf('.') + 1).toLocaleLowerCase();
		name = ext == "" ? sync.step + "_" + sync.sid + "_" + sync.key + ".jpg" : sync.step + "_" + sync.sid + "_" + sync.key + "." + ext;
		//for ios
		//var targetPath = cordova.file.documentsDirectory + name;
		//for android
		var targetPath = cordova.file.externalApplicationStorageDirectory + name;
		var trustHosts = true
		var options = {"timeout": 10000};
		$rootScope.loading.push(sync.step + "_" + sync.sid + "_" + sync.key);

		$cordovaFileTransfer.download(sync.uri, targetPath, options, trustHosts).then(function(result) {
			var update = {"sync": sync, "targetPath": targetPath};
			var key = sync.step + "_" + sync.sid + "_" + sync.key;
			var idx = $rootScope.loading.indexOf(key);
			if (idx != -1) {
				$rootScope.loading.splice(idx, 1);
			}
			$rootScope.update.push(update);
			self.update();
		}, function(error) {
			var key = sync.step + "_" + sync.sid + "_" + sync.key;
			var idx = $rootScope.loading.indexOf(key);
			if (idx != -1) {
				$rootScope.loading.splice(idx, 1);
			}
		});
	}

	self.update = function() {
		if ($rootScope.update.length > 0 && $rootScope.updating == 0) {
			$rootScope.updating = 1;
			for (var i in $rootScope.update) {
				var sync = $rootScope.update[i].sync;
				var targetPath = $rootScope.update[i].targetPath;
				$rootScope.update.splice(i, 1);
				var data = DbService.getStep(sync.sid, sync.step);
				if (data != null) {
					if (sync.step == 'step1') {
						for (var i in data.list) {
							if (data.list[i].type == 'image') {
								for (var j in data.list[i].images) {
									if (data.list[i].images[j].fid == sync.key) {
										data.list[i].images[j].path = targetPath;
										data.list[i].images[j].thumbnail = targetPath;
									}
								}
								break;
							}
						}
					} else {
						for (var key in data.files) {
							if (key == sync.key) {
								data.files[key].path = targetPath;
								data.files[key].thumbnail = targetPath;
								data.files[key].time = sync.time;
							}
						}
					}

					DbService.setStep(sync.sid, sync.step, data);
				}
			}
			$rootScope.updating = 0;
		}
	}

	self.upload = function(sync) {
		var server = $rootScope.base_url + "/api/actions";
		var targetPath = sync.path;
		var trustHosts = true;
		var mimeType = 'unknown';
		var name = targetPath.substr(targetPath.lastIndexOf('/') + 1);
		var ext = name.substr(name.lastIndexOf('.') + 1).toLocaleLowerCase();

		switch (ext) {
			case 'jpg':
			case 'jpeg':
				mimeType = 'image/jpeg';
				break;
			case 'gif':
				mimeType = 'image/gif';
				break;
			case 'png':
				mimeType = 'image/png';
				break;
			default:
				if (name.lastIndexOf('.') == -1) {
					mimeType = 'image/jpeg';
					name = name + ".jpg";
				}
		}

		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = name;
		options.mimeType = mimeType;
		options.chunkedMode = false;
		options.timeout = 10000;
		options.params = {
			"action" : "upload",
			"uid" : $rootScope.uid,
			"session" : $rootScope.session,
			"sid" : sync.sid,
			"step" : sync.step,
			"key" : sync.step == 'step1' ? sync.key.replace("new_", "") : sync.key.replace("file_", "")
		};

		$cordovaFileTransfer.upload(server, targetPath, options, trustHosts).then(function(result) {
			$rootScope.localSync--;
			var data = angular.fromJson(result.response);

			if (data.success == 1) {
				var step = DbService.getStep(sync.sid, sync.step);
				if (step != null) {
					switch (sync.step) {
					case 'step1':
						for (var key in step.list) {
							if (step.list[key].type == 'image') {
								for (var i in step.list[key].images) {
									if (step.list[key].images[i].fid == sync.key) {
										step.list[key].images[i].fid = data.fid;
										step.list[key].images[i].sync = 0;
										break;
									}
								}
								break;
							}
						}
						break;
					case 'step2':
					case 'step3':
					case 'step4':
					case 'step5':
						for (var key in step.files) {
							if (key == sync.key) {
								step.files[key].sync = 0;
								break;
							}
						}
						break;
					}

					DbService.setStep(sync.sid, sync.step, step);
				}
			}
		}, function(err) {
			$rootScope.localSync--;
			$rootScope.failed++;
		});
	}

	self.add = function(sync) {
		var request = $http({
			method : "post",
			url : $rootScope.base_url + "/api/actions",
			crossDomain : true,
			data : {
				uid : $rootScope.uid,
				session : $rootScope.session,
				action : "comment",
				sid : sync.sid,
				params : sync.params
			},
			timeout: 10000,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		request.success(function(data) {
			$rootScope.localSync--;
			if (data.success == 1) {
				var step = DbService.getStep(sync.sid, sync.step);
				if (step != null) {
					for (var i in step.list) {
						if (step.list[i].id == sync.key) {
							step.list[i].id = data.id;
							step.list[i].sync = 0;
							DbService.setStep(sync.sid, sync.step, step);
							break;
						}
					}
				}
			}
		});

		request.error(function() {
			$rootScope.localSync--;
			$rootScope.failed++;
		});
	}

	self.delete = function(sync) {
		var data = {
			uid : $rootScope.uid,
			session : $rootScope.session,
			action : "delete",
			sid : sync.sid,
			step : sync.step
		};
		if (sync.step == 'step1') {
			data.type = 'image';
			data.fid = sync.key;
		} else if (sync.step == 'comment') {
			data.type = 'comment';
			data.id = sync.key;
		}

		var request = $http({
			method : "post",
			url : $rootScope.base_url + "/api/actions",
			crossDomain : true,
			data : data,
			timeout: 10000,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		request.success(function(data) {
			$rootScope.localSync--;
			if (data.success == 1) {
				var step = DbService.getStep(sync.sid, sync.step);
				if (step != null) {
					switch (sync.step) {
					case 'step1':
						for (var key in step.list) {
							if (step.list[key].type == 'image') {
								for (var i = 0; i < step.list[key].images.length; i++) {
									if (step.list[key].images[i].fid == sync.key) {
										step.list[key].images.splice(i);
										break;
									}
								}
								break;
							}
						}
						break;
					case 'comment':
						for (var i = 0; i < step.list.length; i++) {
							if (step.list[i].id == sync.key) {
								step.list.splice(i);
								break;
							}
						}
						break;
					}

					DbService.setStep(sync.sid, sync.step, step);
				}
			}
		});

		request.error(function() {
			$rootScope.localSync--;
			$rootScope.failed++;
		});
	}

	self.read = function(sync) {
		var request = $http({
			method : "post",
			url : $rootScope.base_url + "/api/actions",
			crossDomain : true,
			data : {
				uid : $rootScope.uid,
				session : $rootScope.session,
				action : "read",
				sid : sync.sid,
				step : sync.step,
				id : sync.key
			},
			timeout: 10000,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		request.success(function(data) {
			$rootScope.localSync--;
			if (data.success == 1) {
				var step = DbService.getStep(sync.sid, sync.step);
				if (step != null) {
					for (var i = 0; i < step.list.length; i++) {
						if (step.list[i].id == sync.key) {
							step.list[i].read = 0;
							break;
						}
					}
					DbService.setStep(sync.sid, sync.step, step);
				}
			}
		});

		request.error(function() {
			$rootScope.localSync--;
		});
	}

	self.getSync = function() {
		var queue = [];
		var list = DbService.getList($rootScope.uid);
		if (list != null) {
			for (var i in list) {
				var step1 = DbService.getStep(list[i].sid, 'step1');
				if (step1 != null) {
					for (var key in step1.list) {
						if (step1.list[key].type == 'image') {
							for (var j in step1.list[key].images) {
								if (step1.list[key].images[j].sync == 1) {
									var sync = {
										"sid" : list[i].sid,
										"step" : "step1",
										"key" : step1.list[key].images[j].fid,
										"action" : "upload",
										"path" : step1.list[key].images[j].path,
										"time" : 0
									};
									queue.push(sync);
								} else if (step1.list[key].images[j].deleted == 1) {
									var sync = {
										"sid" : list[i].sid,
										"step" : "step1",
										"key" : step1.list[key].images[j].fid,
										"action" : "delete"
									};
									queue.push(sync);
								}
							}
							break;
						}
					}
				}

				var step2 = DbService.getStep(list[i].sid, 'step2');
				if (step2 != null) {
					for (var key in step2.files) {
						if (step2.files[key].sync == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "step2",
								"key" : key,
								"action" : "upload",
								"path" : step2.files[key].path,
								"time" : step2.files[key].time
							};
							queue.push(sync);
						}
					}
				}

				var step3 = DbService.getStep(list[i].sid, 'step3');
				if (step3 != null) {
					for (var key in step3.files) {
						if (step3.files[key].sync == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "step3",
								"key" : key,
								"action" : "upload",
								"path" : step3.files[key].path,
								"time" : step3.files[key].time
							};
							queue.push(sync);
						}
					}
				}

				var step4 = DbService.getStep(list[i].sid, 'step4');
				if (step4 != null) {
					for (var key in step4.files) {
						if (step4.files[key].sync == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "step4",
								"key" : key,
								"action" : "upload",
								"path" : step4.files[key].path,
								"time" : step4.files[key].time
							};
							queue.push(sync);
						}
					}
				}

				var step5 = DbService.getStep(list[i].sid, 'step5');
				if (step5 != null) {
					for (var key in step5.files) {
						if (step5.files[key].sync == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "step5",
								"key" : key,
								"action" : "upload",
								"path" : step5.files[key].path,
								"time" : step5.files[key].time
							};
							queue.push(sync);
						}
					}
				}

				var contact = DbService.getStep(list[i].sid, 'contact');
				if (contact != null) {
					for (var key in contact.list) {
						if (contact.list[key].read == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "contact",
								"key" : contact.list[key].id,
								"action" : "read"
							};
							queue.push(sync);
						}
					}
				}

				var comment = DbService.getStep(list[i].sid, 'comment');
				if (comment != null) {
					for (var key in comment.list) {
						if (comment.list[key].sync == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "comment",
								"key" : comment.list[key].id,
								"action" : "add",
								"params" : comment.list[key]
							};
							queue.push(sync);
						} else if (comment.list[key].deleted == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "comment",
								"key" : comment.list[key].id,
								"action" : "delete"
							};
							queue.push(sync);
						} else if (comment.list[key].read == 1) {
							var sync = {
								"sid" : list[i].sid,
								"step" : "comment",
								"key" : comment.list[key].id,
								"action" : "read"
							};
							queue.push(sync);
						}
					}
				}
			}
		}

		return queue;
	}

	return self;
}
