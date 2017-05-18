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
				self.mapView.deselectAnnotation(dummyAnnotation);
				_e.annotation.wiki = undefined;

			}
		} else if (_e.clicksource == 'polygon') {
			dummyAnnotation.setLatitude(_e.source.center.y);
			if (_e.source.wiki) {
				dummyAnnotation.rightButton = '/assets/wiki.png';
				dummyAnnotation.wiki = _e.source.wiki;
				self.mapView.deselectAnnotation(dummyAnnotation);
			} else {
				dummyAnnotation.rightButton = null;
				dummyAnnotation.wiki = undefined;
			}
			dummyAnnotation.setLongitude(_e.source.center.x);
			dummyAnnotation.setTitle(_e.source.description);
			//self.mapView.dummyAnnotation.setSubtitle(_e.source.area);
			self.mapView.selectAnnotation(dummyAnnotation);
		}
	}

	var TileOverlays = {
		/*"OpenStreetMap/DE" : Map.createTileOverlay({
		 tileProvider : "OpenStreetMap/DE",
		 zIndex : -1.0,
		 fadeIn : true
		 }),*/
		"OpenSeaMap" : Map.createTileOverlay({
			zIndex : 0,
			tileProvider : "OpenSeaMap"
		})
	};
	var dummyAnnotation = Map.createAnnotation({
		image : '/assets/null.png',
		latitude : 0,
		longitude : 0
	});

	var factory = Map.createTileProviderFactory();

	var style = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "model", "mapstyle.json").read().getText();

	self.mapView = Map.createView({
		userLocation : Ti.Geolocation.locationServicesEnabled ? true : false,
		region : {
			latitude : 53.51,
			longitude : 9.95,
			longitudeDelta : 0.1,
			latitudeDelta : 0.1
		},
		top : 0, //120,
		mapType : Map.NORMAL_TYPE,
		mapToolbarEnabled : false,
		mapStyle : style,
		routes : {},
		lifecycleContainer : self,
		enableZoomControls : false
	});

	self.mapView.addAnnotation(dummyAnnotation);
	self.mapView.addEventListener('click', handleMapClick);
	self.mapViewOverlays = require('ui/map.overlays')();

	self.removeOverlay = function(options) {
		if (options.tileoverlay) {
			return;
		}
		if (options.name && !options.geojson) {
			var items = self.mapViewOverlays[options.name];
			if (items[0].points) {
				items.forEach(function(route) {
					self.mapView.removeRoute(route);
				});
			} else if (items[0].latitude) {
				items.forEach(function(annotation) {
					self.mapView.removeAnnotation(annotation);
				});
			}
		} else if (options.geojson) {
			var geojson = require(options.name);
			geojson.features.forEach(function(feature) {
				var title = feature.properties[options.property];
				self.mapView.removePolygon(self.mapViewOverlays[options.name][title]);
			});
		}
	};
	self.addOverlay = function(options) {
		if (options.geojson) {
			var geojson = require(options.name);
			if (!self.mapViewOverlays[options.name]) {
				self.mapViewOverlays[options.name] = {};
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
				self.mapViewOverlays[options.name][title] = Map.createPolygon({
					center : p.getCentroid(),
					area : p.getArea(),
					wiki : feature.properties.wiki,
					fillColor : options.property == 'Terminal' ? '#5660' : '#5008',
					description : feature.properties[options.property],
					points : points,
					strokeWidth : 1,
					strokeColor : 'gray'
				});
				self.mapView.addPolygon(self.mapViewOverlays[options.name][title]);
			});
		} else {
			var items = self.mapViewOverlays[options.name];
			if (items) {
				if (items[0].points) {
					items.forEach(function(route) {
						self.mapView.addRoute(route);
					});
				} else if (items[0].latitude) {
					items.forEach(function(annotation) {
						self.mapView.addAnnotation(annotation);
					});
				}
			}
		}
	};
	self.updateRoutes = function(routenames) {
		/*
		 self.mapView.routes is an object, key is name and value are collection of routeViews
		 */
		Object.getOwnPropertyNames(self.mapView.routes).forEach(function(name) {// name of route
			console.log(name);
			self.mapView.routes[name].forEach(function(rv) {
				console.log(rv);
				// remove all routes:
				self.mapView.removeRoute(rv);
			});
		});
		// persists:
		Ti.App.Properties.setList('ROUTES', routenames);
		// reload from model:
		var RouteViews = require('model/routes').getAllRouteViews();
		// add to map
		RouteViews.forEach(function(rv) {
			if (rv.enabled) {
				self.mapView.routes[rv.name] = [];
				rv.views.forEach(function(v) {
					self.mapView.routes[rv.name].push(v);
					self.mapView.addRoute(v);
				});

			}
		});
	};
	// end of update Routes

	var RouteViews = require('model/routes').getAllRouteViews();
	RouteViews.forEach(function(rv) {
		if (rv.enabled) {
			self.mapView.routes[rv.name] = [];
			rv.views.forEach(function(v) {
				self.mapView.routes[rv.name].push(v);
				self.mapView.addRoute(v);
			});

		}
	});

	self.addEventListener('open', function() {
		self.add(self.mapView);
		self.mapView.addEventListener('complete', function() {
			Object.getOwnPropertyNames(TileOverlays).forEach(function(o) {
				console.log(o);
				self.mapView.addTileOverlay(Map.createTileOverlay({
					tileProvider : o
				}));
			});
		});
	});
	Ti.Gesture.addEventListener('orientationchange', function() {
		//self.mapView && self.mapView.setTop(Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth ? 120 : 70);
	});
	console.log('GSM=' + require('vendor/gms.test')());
	return self;
};
