var abx = require('com.alcoapps.actionbarextras');
var TouchGallery = require("com.gbaldera.titouchgallery");

Module = function(args) {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		backgroundColor : 'gray'
	});
	self.gallery = TouchGallery.createTouchGallery({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		left : 0,
		right : 0,
		bottom : 0,
		top : 0
	});
	self.add(self.gallery);
	self.addEventListener("open", function() {
		self.gallery.setImages([args.image, args.image]);
		console.log([args.image]);
		var activity = self.getActivity();
		if (activity && activity.actionBar) {
			actionbar = activity.actionBar;
			actionbar.setDisplayHomeAsUp(true);
			abx.setTitle('Hafenerlebnistour');
			actionbar.onHomeIconItemSelected = function() {
				self.close();
			};
		}
	});
	return self;
};

module.exports = Module;
