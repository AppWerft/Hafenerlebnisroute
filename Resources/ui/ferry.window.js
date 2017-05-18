var Moment = require('vendor/moment');
Moment.locale('de');
var Map = require('ti.map');
var ferries = require('model/pois').ferries.sort(function(a, b) {
	return a.line > b.line;
});
const HEIGHT = 100;
module.exports = function(options) {
	function getNextDeparture(departs) {
		var minutesofday = Moment().hour() * 60 + Moment().minute();
		// - Moment().utcOffset();
		var minutesdeparture = -1;
		var found = false;
		for (var i = 0; i < departs.length; i++) {
			var depart = departs[i].toString();
			minutesdeparture = parseInt(depart.split('.')[0]) * 60 + parseInt(depart.split('.')[1]);
			if (minutesdeparture > minutesofday) {
				found = true;
				break;
			}
		};
		if (found) {
			var hh = Math.floor(minutesdeparture / 60);
			var mm = minutesdeparture - hh * 60;
			if (mm < 10)
				mm = '0' + mm;
			return '' + hh + ':' + mm + ' Uhr';
		}
		return null;
	}

	var data = [];
	var self = Ti.UI.createWindow();
	self.topcontainer = Ti.UI.createView({
		top : 0,
		backgroundColor : '#092B55',
		height : HEIGHT
	});
	self.add(self.topcontainer);
	self.topcontainer.add(Map.createView({
		region : {
			latitude : options.ll[0],
			longitude : options.ll[1],
			longitudeDelta : 0.005,
			latitudeDelta : 0.005
		},
		left : 0,
		touchEnabled : false,
		mapType : Map.HYBRID_TYPE,
		width : 150,
		enableZoomControls : false
	}));
	self.topcontainer.add(Ti.UI.createLabel({
		text : 'Nächste Abfahrt der Fähre Richtung ' + options.direction + ':',
		left : 155,
		top : 5,
		color : '#ccc',
		font : {
			fontSize : 16,
			fontFamily : 'Aller Bold'
		}
	}));
	var nextdeparture = getNextDeparture(options.departs);
	self.topcontainer.add(Ti.UI.createLabel({
		text : nextdeparture ? nextdeparture : 'Heute fährt leider keine Fähre mehr.',
		left : 155,
		bottom : 2,
		color : '#FC6A71',
		font : {
			fontSize : nextdeparture ? 36 : 16,
			fontFamily : nextdeparture ? 'LLPIXEL3' : 'Aller Bold'
		}
	}));
	self.list = Ti.UI.createTableView({
		top : HEIGHT,
		bottom : 0,
		separatorColor : '#092B55',
		backgroundColor : 'white',
		data : data
	});
	var departs = {};
	options.departs.forEach(function(dep) {
		var hh = dep.toString().split('.')[0];
		var mm = Math.round((dep - hh) * 100);
		console.log(mm);
		if (departs[hh] == undefined)
			departs[hh] = [];
		departs[hh].push(mm);
	});
	console.log(departs);
	Object.getOwnPropertyNames(departs).forEach(function(h) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			layout : 'horizontal'
		});
		row.add(Ti.UI.createLabel({
			text : h,
			left : 10,
			width : 60,
			bottom : 0,
			color : '#777',
			font : {
				fontSize : 40,
				fontFamily : 'Aller Bold'
			}
		}));
		departs[h].forEach(function(minute) {
			if (minute < 10)
				minute = '0' + minute;
			row.add(Ti.UI.createLabel({
				width : 36,
				height : Ti.UI.SIZE,
				left : 0,
				bottom : 5,
				text : minute,
				color : '#13258B',
				font : {
					fontSize : 20,
					fontFamily : 'Aller Bold'
				}
			}));
		});
		data.push(row);
	});
	self.list.data = data;
	self.add(self.list);
	self.list.addEventListener('scroll', function(e) {
		var top = HEIGHT * e.firstVisibleItem / e.visibleItemCount * 1.2;
		return;
		//self.topcontainer.top = 70 + HEIGHT - top;
		self.list.animate({
			duration : 150,
			top : 170 - top
		});
	});
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Anleger „' + options.title + '“');
		АктйонБар.setSubtitle(options.line.replace('l', 'Linie: ') + ',   Richtung: „' + options.direction + '“');
		АктйонБар.setBackgroundColor(blue);
		АктйонБар.setStatusbarColor(red);
		
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.logo = '/images/' + options.line + '.png';
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
		}
	});
	return self;
};

