const LATTENHEIGHT = 366;
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
	var wasserstandView = require('ui/wasserstand').createView();
	self.add(Ti.UI.createImageView({
		image : '/assets/bg.png',
		top : 0,
		width : Ti.UI.FILL,
		height : 'auto'
	}));
	var pin = null;
	var hasLevel = false;
	self.scheduler = Ti.UI.createTableView({
		top : 0,
		bottom : 240,
		height : Ti.UI.FILL
	});
	self.swipeRefreshContainer = swipeRefreshModule.createSwipeRefresh({
		view : self.scheduler,
		top : 0,
		bottom : 200,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	self.swipeRefreshContainer.addEventListener('refreshing', getPrediction);
	self.scheduler.addEventListener('scroll', function() {
		//hand.hide();
	});

	self.tideview = Ti.UI.createWebView({
		url : '/html/index.html',
		bottom : 0,
		opacity : 0,
		backgroundColor : '#092B55',
		disableBounce : true,
		scalesPageToFit : true,
		height : 200,
	});
	self.tideview.addEventListener('load', function() {
		var tides = {
			all : Tide.getChartData(item.id).join(',')
		};
		tides.narrow = tides.all.slice(0, 800);
		tides.active = 'narrow';
		var w = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
		var h = 200;
		var js = 'setChart({w:' + w + ',h:' + h + ',datas:[' + tides[tides.active] + ']});';
		self.tideview.animate({
			opacity : 1
		});
		self.tideview.evalJS(js);

		self.tideview.addEventListener('click', function() {
			if (tides.active == 'all') {
				tides.active = 'narrow';
			} else {
				tides.active = 'all';
			}
			var js = 'setChart({w:' + w + ',h:' + h + ',datas:[' + tides[tides.active] + ']});';
			self.tideview.evalJS(js);
		});
	});

	self.add(self.swipeRefreshContainer);
	//self.add(latte);
	//self.add(hand);
	self.add(self.tideview);
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
				console.log(tides.current);
				if (tides.current.level) {
					console.log('tides.current.level=' + tides.current.level);
					var phi = (tides.current.direction == '+') ? -10 : 10;
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
				for (var s = 0; s < tides.predictions.length; s++) {
					var moonphase = require('vendor/moonphases').get(Moment().add(s,'d'));
					headerviews[s] = Ti.UI.createView({
						height : 18,
						backgroundColor : '#092B55'
					});
					headerviews[s].add(Ti.UI.createLabel({
						text : tides.predictions[s].label,
						textAlign : 'left',
						left : 40,
						font : {
							fontSize : 14,
							fontFamily : 'Aller'
						},
						color : 'white'
					}));
					headerviews[s].add(Ti.UI.createImageView({
						image : '/assets/moon/moon' + Math.round(moonphase.age) + '.png',
						left : 0,
						height : Ti.UI.FILL,
						width : 18
					}));
					sections[s] = Ti.UI.createTableViewSection({
						headerView : headerviews[s]
					});
					var rows = [];
					tides.predictions[s].tides.forEach(function(event) {
						if (!event['in_past'])
							sections[s].add(require('ui/tide.row')(event));
					});
					self.scheduler.setData(sections);
				}

			},
			onerror : function() {
				self.swipeRefreshContainer.setRefreshing(false);
			}
		});
	}


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

