var Matrix = Ti.UI.create2DMatrix();
var GeoTools = require('de.appwerft.geotools');

/*     W I D G E T        */
var Widget = function(args) {
	var that = this;
	this.route = args;
	this.nodeposition = {
		φ : this.route[0][0],
		λ : this.route[0][1]
	};
	function onLocation(_e) {
		if (_e.success) {
			that.myposition = {
				φ : _e.coords.latitude,
				λ : _e.coords.longitude
			};
			console.log(_e.coords.accuracy);
			that.mylocprecision = 0;
		}
	};
	function onHeading(_e) {
		var heading = _e.heading.trueHeading || _e.heading.magneticHeading;
		if (heading != that.lastheading && that.myposition && that.nodeposition) {
			var distbear = GeoTools.getDistBearing(that.myposition.φ, that.myposition.λ, that.nodeposition.φ, that.nodeposition.λ);
			that.arrowView.transform = Ti.UI.create2DMatrix({
				rotate : distbear.bearing - heading
			});
			that.distanceView.setText(Math.round(distbear.distance) + ' m');
			that.lastheading = heading;
		}
	}


	this.view = Ti.UI.createView({
		backgroundColor : 'transparent',
		touchEnabled : false
	});
	this.arrowView = Ti.UI.createImageView({
		text : '⬆',
		color : '#092B55',
		opacity : 0,zIndex:99,
		touchEnabled : false,
		font : {
			fontSize : 290
		},
		image : '/assets/pfeil.png',
		width : 200,
		height : 200
	});
	this.titleView = Ti.UI.createLabel({
		text : args.name,
		width : Ti.UI.FILL,
		color : '#F9EABA',
		height : 0,
		top : 0,
		textAlign : 'center',
		backgroundColor : '#5000',
		font : {
			fontSize : 32,
			fontFamily : 'Aller'
		}
	});
	this.distanceView = Ti.UI.createLabel({
		text : '∞',
		touchEnabled : false,
		color : '#092B55',
		opacity : 0.6,
		touchEnabled : false,
		height : Ti.UI.SIZE,
		bottom : 5,
		font : {
			fontSize : 100,
			fontFamily : 'Aller Bold'
		}
	});
	this.view.add(this.arrowView);
	this.view.add(this.titleView);
	this.view.add(this.distanceView);
	this.view.start = function() {
		that.arrowView.animate({
			opacity : 0.3,
			duration : 1800
		});
		if (Ti.Geolocation.locationServicesEnabled) {
			Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({
				name : Ti.Geolocation.PROVIDER_GPS,
				minUpdateDistance : 10.0,
				minUpdateTime : 10
			}));
			Ti.Geolocation.Android.manualMode = true;
			Ti.Geolocation.addEventListener('heading', onHeading);
			Ti.Geolocation.addEventListener('location', onLocation);
		} else
			Ti.UI.createNotification({
				message : 'Wenn schon offline, dann doch wenigstens GPS ;-))'
			}).show();
	};
	this.view.stop = function() {
		Ti.Geolocation.removeEventListener('heading', onHeading);
		Ti.Geolocation.removeEventListener('location', onLocation);
	};
	return this.view;
};

exports.createView = function(args) {
	return new Widget(args);
};
