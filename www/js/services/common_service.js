function commonService ($ionicPopup) {

	var self = this;

	// A alert dialog
	self.showAlert = function (title, message) {
		var popup = $ionicPopup.alert({
			title: title,
			template: message
		});

		popup.then(function (res) {
		});
	}
	// A confirm dialog
	self.getConfirm = function (title, message) {
		var confirmPopup = $ionicPopup.confirm({
			title: title,
			template: message,
			buttons: [{
				text: 'Cancel'
			}, {
				text: '<b>Yes</b>',
				type: 'button-positive',
				onTap: function (e) {
					return true;
				}
			}]
		});

		return confirmPopup;
	}
	// A options dialog
	self.getOptions = function (option1, option2) {
		var optionsPopup = $ionicPopup.confirm({
			title: "Upload a File",
			template: "Where is your file ?",
			buttons: [{
				text: '<b>' + option1 + '</b>',
				type: 'button-positive',
				onTap: function (e) {
					return 1;
				}
			}, {
				text: '<b>' + option2 + '</b>',
				type: 'button-positive',
				onTap: function (e) {
					return 2;
				}
			}]
		});

		return optionsPopup;
	}

	self.dump = function (arr, level) {
		var dumped_text = "";
		if (!level)
			level = 0;

		var level_padding = "";
		for (var j = 0; j < level + 1; j++)
			level_padding += "    ";

		if (typeof (arr) == 'object') {
			for (var item in arr) {
				var value = arr[item];

				if (typeof (value) == 'object') {
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += self.dump(value, level + 1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		} else {
			dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
		}

		return dumped_text;
	}

	return self;
}
function dataService ($http) {
	var data = {};

	return {
		getData: getData,
		setData: setData
	};

	function getData (key) {
		return data[key];
	}

	function setData (key, value) {
		data[key] = value;
	}
};