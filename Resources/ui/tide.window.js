var CANVASHEIGHT = 240;
var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var Moment = require('vendor/moment');
Moment.locale('de');

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
	self.tideCanvas = require('com.wwl.canvas').createCanvasView({
		backgroundColor : "transparent",
		bottom : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		opacity : 0,
		touchEnabled : false,
		height : CANVASHEIGHT,
		zIndex : 9
	});
	self.add(Ti.UI.createImageView({
		image : '/assets/pano.png',
		top : 0,//120,
		width : 1840,
		height : 700
	}));
	self.children[0].animate({
		left : -320,
		duration : 1500
	});
	var wasserstandView = require('ui/wasserstand').createView();
	wasserstandView.top = 0;//120;
	var pin = null;
	var hasLevel = false;
	self.scheduler = Ti.UI.createTableView({
		top : 0,
		bottom : 0,
		height : Ti.UI.FILL
	});
	self.swipeRefreshContainer = swipeRefreshModule.createSwipeRefresh({
		view : self.scheduler,
		top : 0,//125,
		bottom : 0,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	self.swipeRefreshContainer.addEventListener('refreshing', getPrediction);
	self.scheduler.addEventListener('scroll', function() {
	});
	self.renderCanvas = function() {
		console.log('Info: start rerendering of canvas');
		self.tideCanvas.setOpacity(0);
		self.tideCanvas.clear();
		self.tideCanvas.animate({
			opacity : 0.4,
			duration : 1000
		});
		var w = Ti.Platform.displayCaps.platformWidth / LDF;
		self.tideCanvas.lineWidth = 1;
		self.tideCanvas.strokeStyle = '#092B55';
		self.tideCanvas.antiAliasing = true;
		self.tideCanvas.beginPath();
		self.tideCanvas.moveTo(0, CANVASHEIGHT);
		self.tidedata = Tide.getChartData(item.id);
		var start = new Date().getTime();
		for (var i = 0; i < self.tidedata.length - 1 && i < w * LDF; i += 1) {
			if ( typeof self.tidedata[i] == 'object' && typeof self.tidedata[i].level == 'number') {
				var h = self.tidedata[i].level / 5 * CANVASHEIGHT * LDF;
				self.tideCanvas.moveTo(i, CANVASHEIGHT * LDF);
				self.tideCanvas.lineTo(i, (1 - self.tidedata[i].level / 5) * CANVASHEIGHT * LDF);
			}
		}
		self.tideCanvas.closePath();
		self.tideCanvas.stroke();
	};
	self.tideCanvas.addEventListener('load', function() {
		self.renderCanvas();
	});
	self.add(self.swipeRefreshContainer);
	function getPrediction() {
		console.log('Info: getPrediction is started');
		Tide.getPrediction(item.id, {
			onOk : function(tides) {
				console.log(tides);
				/* switch of colorbar */
				console.log('Info: getPrediction got results');
				self.swipeRefreshContainer.setRefreshing(false);
				if (tides == null) {
					alert('Für diesen Messpunkt liegen für das Jahr 2015 leider keine Angaben vor. ');
					return;
				}
				/* Wasserstand neu rendern, max Level ist aufgerundet +1 m*/
				wasserstandView.addScala({
					current : Math.ceil(tides.current.level) + 1
				});
				if (tides.current.level) {
					wasserstandView.moveTo(tides.current.direction, tides.current.level);
				} else {
					wasserstandView.hide();
				}
				/* Listenarbeit */
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
				self.renderCanvas();
			},
			onerror : function() {
				self.swipeRefreshContainer.setRefreshing(false);
			}
		});
	}


	self.add(self.tideCanvas);
	self.handlerOverlay = Ti.UI.createView({
		bottom : 0,
		bubbleParent : false,
		height : CANVASHEIGHT / 2
	});
	self.redline = Ti.UI.createView({
		bottom : 0,
		touchEnabled : false,
		height : CANVASHEIGHT / 2,
		width : 2 / LDF,
		opacity : 0,
		backgroundColor : '#8a00'
	});
	self.bubble = Ti.UI.createLabel({
		backgroundColor : 'red',
		color : 'white',
		width : Ti.UI.SIZE,
		zIndex : 999,
		font : {
			fontSize : 9
		},
		borderRadius : 3,
		height : Ti.UI.SIZE
	});
	self.add(self.bubble);
	self.add(self.handlerOverlay);
	self.add(self.redline);
	self.handlerOverlay.addEventListener('touchmove', function(_e) {
		if (self.tidedata) {
			var x = Math.floor(_e.x / LDF);
			var y = self.tidedata[x * LDF].level / 5 * CANVASHEIGHT + 10;
			self.redline.setOpacity(1);
			self.redline.setHeight(y);
			self.redline.setLeft(x);
			self.bubble.setText(' Pegel: ' + self.tidedata[x * LDF].level.toFixed(2) + ' m \n ' + Moment(self.tidedata[x * LDF].time * 1000).format('dd, HH:mm') + ' Uhr ');
			self.bubble.setLeft(x);
			self.bubble.setBottom(y);
		}
	});
	Ti.Android && self.addEventListener('focus', function() {
		console.log('Info: tide window got focus');
		getPrediction();
	});
	Ti.Android && self.addEventListener('open', function() {
		console.log('Info: tide window is opened');
		//getPrediction();
		Ti.UI.createNotification({
			message : 'Gezeitendaten für St. Pauli vom Bundesamt für Seeschiffahrt und Hydrographie'
		}).show();

	});
	Ti.Gesture.addEventListener('orientationchange', function() {
		//self.swipeRefreshContainer && self.swipeRefreshContainer.setTop(Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth  ? 120 : 70);
	});
	self.add(wasserstandView);
	return self;
};

