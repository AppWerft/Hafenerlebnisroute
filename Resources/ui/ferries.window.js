var CANVASHEIGHT = 240;
var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var Moment = require('vendor/moment');
Moment.locale('de');

var ferries = require('model/pois').ferries;

module.exports = function() {
	var self = Ti.UI.createWindow();
	self.list = Ti.UI.createTableView({
		top : 120,
		separatorColor :'#102489',
		bottom : 50,
		backgroundColor : 'white',
		data : ferries.map(function(ferry) {
			var row = Ti.UI.createTableViewRow({
				height : 60,
				itemId : ferry && ferry.departs ? JSON.stringify(ferry) : null,
				hasChild : ferry&& ferry.departs ? true : false
			});
			row.add(Ti.UI.createLabel({
				left : 70,
				text : ferry.title,
				top : 10,
				color : '#777',
				height : Ti.UI.SIZE,
				font : {
					fontSize : 24,
					fontFamily : 'Aller Bold'
				}

			}));
			row.add(Ti.UI.createLabel({
				left : 70,
				text : ferry.line == 'l62' ? 'täglich alle 15 Minuten' : 'nur Montag – Freitag',
				bottom : 5,
				color : '#444',
				height : Ti.UI.SIZE,
				font : {
					fontSize : 14,
					fontFamily : 'Aller Bold'
				}

			}));
			row.add(Ti.UI.createImageView({
				left : 10,
				width : 36,
				height : 20,
				image : '/images/' + ferry.line + '.png'
			}));
			return row;
		}),
	});
	self.add(self.list);
	self.list.addEventListener('click', function(e) {
		if (e.row.itemId) {
			require('ui/ferry.window')(JSON.parse(e.rowData.itemId)).open();
		}
	});
	Ti.Gesture.addEventListener('orientationchange', function() {
		self.list && self.list.setTop(Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth  ? 120 : 70);
		self.list && self.list.setBottom(Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth  ? 50 : 0);

	});
	return self;
};

