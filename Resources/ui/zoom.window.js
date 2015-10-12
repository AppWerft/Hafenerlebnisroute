if (Ti.Android) {
	var abx = require('com.alcoapps.actionbarextras');
	var TouchGallery = require("com.gbaldera.titouchgallery");
}

Module = function(args) {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		backgroundColor : '#f8f8f8'
	});
	if (Ti.Android) {
		self.addEventListener("open", function() {
			self.gallery = TouchGallery.createTouchGallery({
				top : 0,
				images : [args.image],
				height : Ti.UI.FILL,
				width : Ti.UI.FILL,
			});
			var bigimages = [args.image];
			//self.gallery.setImages(bigimages);
			self.add(self.gallery);
			var activity = self.getActivity();
			if (activity && activity.actionBar) {
				actionbar = activity.actionBar;
				actionbar.setDisplayHomeAsUp(true);
				//abx.setDisableIcon(true);
				abx.setTitle('Hafenerlebnistour');
				actionbar.onHomeIconItemSelected = function() {
					self.close();
				};
			}
		});
	};
	return self;
};

module.exports = Module;
