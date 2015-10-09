module.exports = function(args) {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({

	});
	self.backgroundColor = 'white';
	var web = Ti.UI.createWebView({
		url : args.url,
		enableZoomControls : false,		
		borderRadius : 1
	});
	self.add(web);

	web.addEventListener('load', function() {
		self.spinner && self.spinner.hide();
	});
	self.addEventListener('androidback', function() {
		if (web.canGoBack()) {
			web.goBack();
		} else {
			self.close();
		}
	});
	self.spinner = Ti.UI.createActivityIndicator({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		visible : true,
		zIndex : 999,
		style : (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG
	});
	self.add(self.spinner);
	setTimeout(function() {
		self.remove(self.spinner);
	}, 5000);
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle(args.title);
		АктйонБар.setSubtitle('Wikipedia');
		АктйонБар.setFont('Aller Bold');
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
		}
	});
	return self;
};
