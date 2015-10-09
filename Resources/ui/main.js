module.exports = function() {
	var self = Ti.UI.createTabGroup({
		fullscreen : false,
		swipeable : true,
	});
	self.addEventListener('open', require('ui/actionbar'));
	self.addTab(Ti.UI.createTab({
		window : require('ui/map.window')(),
		title : 'Radlerkarte',
	}));
	self.addTab(Ti.UI.createTab({
		window : require('ui/tide.window')(),
		title : 'Tideplan',
	}));
	self.addTab(Ti.UI.createTab({
		window : require('ui/hafentv.window')(),
		title : 'HafenTV',
	}));
	return self;
	

};
