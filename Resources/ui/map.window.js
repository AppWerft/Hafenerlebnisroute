var Map = require('ti.map'),
    Polygon = require('vendor/geopolygon');

require('vendor/versionsreminder')();

module.exports = function() {
	var self = Ti.UI.createWindow({
		backgroundColor : '#092B55'
	});
	function handleMapClick(_e) {
		Ti.Media.vibrate([1, 1]);
		if (_e.annotation) {
			if (_e.annotation.pdf && _e.clicksource != 'pin') {
				require('ui/pdf.window')({
					pdf : _e.annotation.pdf,
					line : _e.annotation.line.replace('l', '')
				}).open();
			} else if (_e.annotation.wiki && _e.clicksource != 'pin' && _e.clicksource !== 'polygon') {
				require('ui/wiki.window')({
					title : _e.annotation.title,
					url : _e.annotation.wiki
				}).open();
				self.map.deselectAnnotation(self.map.dummyAnnotation);
				_e.annotation.wiki = undefined;

			}
		} else if (_e.clicksource == 'polygon') {
			self.map.dummyAnnotation.setLatitude(_e.source.center.y);
			if (_e.source.wiki) {
				self.map.dummyAnnotation.rightButton = '/assets/wiki.png';
				self.map.dummyAnnotation.wiki = _e.source.wiki;
				self.map.deselectAnnotation(self.map.dummyAnnotation);
			} else {
				self.map.dummyAnnotation.rightButton = null;
				self.map.dummyAnnotation.wiki = undefined;
			}
			self.map.dummyAnnotation.setLongitude(_e.source.center.x);
			self.map.dummyAnnotation.setTitle(_e.source.description);
			//self.map.dummyAnnotation.setSubtitle(_e.source.area);
			self.map.selectAnnotation(self.map.dummyAnnotation);
		}
	}


	self.map = Map.createView({
		userLocation : true,
		region : {
			latitude : 53.51,
			longitude : 9.95,
			longitudeDelta : 0.1,
			latitudeDelta : 0.1
		},
		enableZoomControls : false
	});
	self.map.dummyAnnotation = Map.createAnnotation({
		image : '/assets/null.png',
		latitude : 0,
		longitude : 0
	});
	self.map.addAnnotation(self.map.dummyAnnotation);
	self.map.addEventListener('click', handleMapClick);
	self.mapOverlays = require('ui/map.overlays')();

	self.removeOverlay = function(options) {
		if (options.name && !options.geojson) {
			var items = self.mapOverlays[options.name];
			if (items[0].points) {
				items.forEach(function(route) {
					self.map.removeRoute(route);
				});
			} else if (items[0].latitude) {
				items.forEach(function(annotation) {
					self.map.removeAnnotation(annotation);
				});
			}
		} else if (options.geojson) {
			var geojson = require(options.name);
			geojson.features.forEach(function(feature) {
				var title = feature.properties[options.property];
				self.map.removePolygon(self.mapOverlays[options.name][title]);
			});
		}

	};
	self.addOverlay = function(options) {
		if (options.geojson) {
			var geojson = require(options.name);
			if (!self.mapOverlays[options.name]) {
				self.mapOverlays[options.name] = {};
			}
			geojson.features.forEach(function(feature) {
				var title = feature.properties[options.property];
				var points = feature.geometry.coordinates[0].map(function(p) {
					return {
						latitude : p[1],
						longitude : p[0]
					};
				});
				var p = new Polygon(feature.geometry.coordinates[0]);
				self.mapOverlays[options.name][title] = Map.createPolygon({
					center : p.getCentroid(),
					area : p.getArea(),
					wiki : feature.properties.wiki,
					fillColor : options.property == 'Terminal' ? '#5660' : '#5008',
					description : feature.properties[options.property],
					points : points,
					strokeWidth : 1,
					strokeColor : 'gray'
				});
				self.map.addPolygon(self.mapOverlays[options.name][title]);
			});
		} else {
			var items = self.mapOverlays[options.name];
			if (items) {
				if (items[0].points) {
					items.forEach(function(route) {
						self.map.addRoute(route);
					});
				} else if (items[0].latitude) {
					items.forEach(function(annotation) {
						self.map.addAnnotation(annotation);
					});
				}
			}
		}
	};
	self.addEventListener('open', function() {
		self.add(self.map);
	});
	return self;
};
