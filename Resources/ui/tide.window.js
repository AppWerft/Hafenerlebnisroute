var CANVASHEIGHT = 240;
var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var Tide = new (require('controls/bsh.proxy'))(),
    Moment = require('vendor/moment'),
    swipeRefreshModule = require('com.rkam.swiperefreshlayout');

module.exports = function() {
	var item = {
		"label" : "Hamburg, St. Pauli",
		"gps" : "53.545555,9.97",
		"id" : "DE__508P",
		"skn" : 1.9
	};
	var self = Ti.UI.createWindow();
	self.add(Ti.UI.createImageView({
		image : '/assets/pano.png',
		top : 0,
		width :1840,
		height : 700
	}));
	self.children[0].animate({
		left : -320,
		duration : 1500
	});	
	var wasserstandView = require('ui/wasserstand').createView();
	
	self.tideCanvas = require('com.wwl.canvas').createCanvasView({
		backgroundColor : "transparent",
		bottom : -CANVASHEIGHT,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		opacity : 0.6,
		touchEnabled : false,
		height : CANVASHEIGHT,
		zIndex : 9
	});
	var pin = null;
	var hasLevel = false;
	self.scheduler = Ti.UI.createTableView({
		top : 0,
		bottom : 0,
		height : Ti.UI.FILL
	});
	self.swipeRefreshContainer = swipeRefreshModule.createSwipeRefresh({
		view : self.scheduler,
		top : 0,
		bottom : 0,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	self.swipeRefreshContainer.addEventListener('refreshing', getPrediction);
	self.scheduler.addEventListener('scroll', function() {
		//hand.hide();
	});
	self.tideCanvas.addEventListener('load', function() {
		self.tideCanvas.animate({
			bottom : 0,
			duration : 1000
		});
		var tides = {
			all : Tide.getChartData(item.id).join(',')
		};
		var w = Ti.Platform.displayCaps.platformWidth / LDF;
		self.tideCanvas.lineWidth = 1;
		self.tideCanvas.strokeStyle = '#092B55';
		self.tideCanvas.antiAliasing = true;
		self.tideCanvas.beginPath();
		self.tideCanvas.moveTo(0, CANVASHEIGHT);
		var tidedata = Tide.getChartData(item.id);
		var start = new Date().getTime();
		var length = tides.all.length;
		for (var i = 0; i < length - 1 && i < w * LDF; i += 1) {
			if ( typeof tidedata[i] == 'number') {
				var h = tidedata[i] / 5 * CANVASHEIGHT * LDF;
				self.tideCanvas.moveTo(i, CANVASHEIGHT * LDF);
				self.tideCanvas.lineTo(i, (1 - tidedata[i] / 5) * CANVASHEIGHT * LDF);
			}
		}
		console.log('Info: rendering of canvas: ' + (new Date().getTime() - start));
		self.tideCanvas.closePath();
		self.tideCanvas.stroke();
		self.tideCanvas.addEventListener('click', function() {
			if (tides.active == 'all') {
				tides.active = 'narrow';
			} else {
				tides.active = 'all';
			}
		});
	});
	self.add(self.swipeRefreshContainer);
	function getPrediction() {
		Tide.getPrediction(item.id, {
			onOk : function(tides) {
				self.swipeRefreshContainer.setRefreshing(false);
				if (tides == null) {
					alert('Für diesen Messpunkt liegen für das Jahr 2015 leider keine Angaben vor. ');
					return;
				}
				wasserstandView.addScala({
					current : Math.ceil(tides.current.level) + 1
				});
				if (tides.current.level) {
					wasserstandView.moveTo(tides.current.direction, tides.current.level);
				} else {
					wasserstandView.hide();
				}
				var sections = [],
				    headerviews = [];
				if (tides == null) {
					self.swipeRefreshContainer.setRefreshing(false);
					alert('Keine Tidedaten vorhanden – offline?');
				}
				self.scheduler.sections = tides.predictions.map(function(prediction, ndx) {
					var section = Ti.UI.createTableViewSection({
						headerView : require('ui/tide.headerview')(ndx, prediction.label)
					});
					prediction.tides.forEach(function(event) {
						if (!event['in_past'])
							section.add(require('ui/tide.row')(event));
					});
					return section;
				});
			},
			onerror : function() {
				self.swipeRefreshContainer.setRefreshing(false);
			}
		});
	}


	self.add(self.tideCanvas);

	Ti.Android && self.addEventListener('focus', function() {
	});
	Ti.Android && self.addEventListener('blur', function() {
	});
	Ti.Android && self.addEventListener('open', function() {
		getPrediction();
		Ti.UI.createNotification({
			message : 'Gezeitendaten für St. Pauli vom Bundesamt für Seeschiffahrt und Hydrographie'
		}).show();

	});
	self.add(wasserstandView);
	return self;
};

