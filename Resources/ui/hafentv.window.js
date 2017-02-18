var YT = require('ti.youtubeproxy');
var swipeRefreshModule = require('com.rkam.swiperefreshlayout');

var startYT = function(_e) {
	try {
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			data : 'vnd.youtube://' + _e.row.itemId

		});
		intent.putExtra("force_fullscreen", true);
		intent.putExtra("force_finishOnEnd", true);
		Ti.Android.currentActivity.startActivity(intent);
	} catch(E) {
		Ti.Platform.openURL('http://search?q=youtube');
	}
};

module.exports = function() {
	var self = Ti.UI.createWindow({
		backgroundColor : '#092B55'
	});
	self.add(Ti.UI.createImageView({
		image : '/assets/pano.png',
		top : 0,//120,
		width : 1840,
		height : 700
	}));
	self.children[0].animate({
		left : -320,
		duration : 1500
	});
	function updateList() {
		self.swipeRefreshContainer.setRefreshing(true);
		YT.getVideosByplaylistId({
			"id" : 'PLOxAwds171bddg8MGOaoWKRctzXO6tMQK',
			"default" : require('model/ytchannel')
		}).then(function(res) {
			self.swipeRefreshContainer.setRefreshing(false);
			Ti.UI.createNotification({
				message : 'Daten des YoutubeChannels „HafenTV“ erneuert.'
			}).show();
			var rows = res.map(require('ui/video.row'));
			self.list.setData(rows);
		}, function() {
			Ti.UI.createNotification({
				message : 'Ohne Internet gibt es nur wenig aktuelle HafenTV-Videos'
			}).show();
			self.swipeRefreshContainer.setRefreshing(false);

		});
	}


	self.list = Ti.UI.createTableView();
	self.swipeRefreshContainer = swipeRefreshModule.createSwipeRefresh({
		view : self.list,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		top : 0,//125
	});
	self.add(self.swipeRefreshContainer);
	self.swipeRefreshContainer.addEventListener('refreshing', updateList);
	self.addEventListener('focus', updateList);
	self.list.addEventListener('singletap', startYT);
	Ti.Gesture.addEventListener('orientationchange', function() {
		//self.swipeRefreshContainer && self.swipeRefreshContainer.setTop(Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth ? 120 : 70);
	});
	return self;
};
