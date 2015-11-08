! function() {
	Ti.UI.backgroundColor = '#092B55';
	var navigationControler = require('ui/main')();
	navigationControler.addEventListener('open', function() {
		var Tide = new (require('controls/bsh.proxy'))();
		Tide.loadStations(true, {
			onload : function() {
				Ti.UI.createNotification({
					message : 'Tidedaten mit dem BSH synchronisiert.'
				}).show();
			},
			onprogress : function() {
			}
		});
	});
	navigationControler.addEventListener("android:back", function(_e) {
		_e.cancelBubble = true;
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_MAIN,
			flags : Ti.Android.FLAG_ACTIVITY_NEW_TASK
		});
		intent.addCategory(Ti.Android.CATEGORY_HOME);
		Ti.Android.currentActivity.startActivity(intent);
		return false;
	});
	navigationControler.open();
}();
