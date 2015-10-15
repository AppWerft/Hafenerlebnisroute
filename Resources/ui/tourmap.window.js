var Map = require('ti.map'),
    Polygon = require('vendor/geopolygon');

module.exports = function(route) {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	self.map = Map.createView({
		userLocation : true,
		region : {
			latitude : 53.51,
			longitude : 9.95,
			longitudeDelta : 0.1,
			latitudeDelta : 0.1
		},
		enableZoomControls : false,
		mapType : Map.TERRAIN_TYPE
	});
	var routeView = Map.createRoute({
		points : route.route.map(function(p) {
			return {
				latitude : p[0],
				longitude : p[1]
			};
		}),
		color : '#aa092B55',
		width : 10
	});
	self.addEventListener('open', function(_event) {
		self.add(self.map);
		self.add(self.compass);
		self.map.addRoute(routeView);
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hafenerlebnistour');
		АктйонБар.setSubtitle(route.title);
		АктйонБар.setBackgroundColor('#f00');
		АктйонБар.subtitleColor = "#ccc";
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
