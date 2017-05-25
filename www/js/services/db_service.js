function dbService () {

	var self = this;

	self.getList = function(uid) {
		var list = localStorage.getItem("platinum_registration_list_" + uid);
		if ( typeof list != 'undefined' && list != null && list.length > 0) {
			list = angular.fromJson(list);
		} else {
			list = null;
		}

		return list;
	}

	self.setList = function(uid, list) {
		localStorage.setItem("platinum_registration_list_" + uid, angular.toJson(list));
	}

	self.getItem = function(sid) {
		var item = localStorage.getItem("platinum_registration_item_" + sid);
		if ( typeof item != 'undefined' && item != null && item.length > 0) {
			item = angular.fromJson(item);
		} else {
			item = null;
		}

		return item;
	}

	self.setItem = function(sid, item) {
		localStorage.setItem("platinum_registration_item_" + sid, angular.toJson(item));
	}

	self.getStep = function(sid, step) {
		var data = localStorage.getItem("platinum_registration_step_" + sid + "_" + step);
		if ( typeof data != 'undefined' && data != null && data.length > 0) {
			data = angular.fromJson(data);
		} else {
			data = null;
		}

		return data;
	}

	self.setStep = function(sid, step, data) {
		localStorage.setItem("platinum_registration_step_" + sid + "_" + step, angular.toJson(data));
	}

	return self;
}