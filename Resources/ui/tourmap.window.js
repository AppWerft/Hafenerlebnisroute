var Map = require('ti.map'),
    Polygon = require('vendor/geopolygon');

module.exports = function(route) {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	var style=  Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "model", "darkmapstyle.json").read().getText();
	self.map = Map.createView({
		userLocation : true,
		mapStyle :style,
		region : {
			latitude : 53.51,
			longitude : 9.95,
			longitudeDelta : 0.1,
			latitudeDelta : 0.1
		},
		enableZoomControls : false,
		mapType : Map.NORMAL_TYPE
	});
	var routeView = Map.createRoute({
		points : route.route.map(function(p) {
			return {
				latitude : p[0],
				longitude : p[1]
			};
		}),
		color : '#ffff00',
		width : 10
	});
	self.addEventListener('open', function(_event) {
		self.add(self.map);
		self.add(self.compass);
		self.map.addRoute(routeView);
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hafenerlebnistour');
		АктйонБар.setSubtitle(route.title);
		АктйонБар.subtitleColor = "#ccc";
		АктйонБар.backgroundColor = blue;
		АктйонБар.setStatusbarColor(red);

		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
		}
	});
	self.addEventListener('close', function(_event) {
		self.compass.stop();
		self.compass = null;
	});
	self.compass = require('ui/compass').createView(route.route);

	self.compass && self.compass.start();
	return self;
};
