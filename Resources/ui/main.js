Ti.UI.backgroundColor = '#092B55';
module.exports = function() {
	var self = Ti.UI.createTabGroup({
		fullscreen : false,
		swipeable : true,
		backgroundColor : '#092B55',
		backgroundSelectedColor : '#092B55'
	});
	self.addEventListener('open', require('ui/actionbar'));
	self.addTab(Ti.UI.createTab({
		window : require('ui/map.window')(),
		title : 'Radlerkarte',
		backgroundColor : '#092B55'
	}));
	self.addTab(Ti.UI.createTab({
		window : require('ui/touren.window')(),
		title : 'Touren',
		backgroundColor : '#092B55'
	}));
	self.addTab(Ti.UI.createTab({
		window : require('ui/tide.window')(),
		title : 'Tideplan',
		backgroundColor : '#092B55'
	}));
	self.addTab(Ti.UI.createTab({
		window : require('ui/hafentv.window')(),
		title : 'HafenTV',
		backgroundColor : '#092B55'
	}));
	return self;

};
