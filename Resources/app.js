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
	navigationControler.open();
}();
