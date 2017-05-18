var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var Moment = require('vendor/moment');
Moment.locale('de');
var FTP = require("de.appwerft.ftp4j");
var GIF = require("com.miga.gifview");
var gifFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, "rainradar.gif");

module.exports = function() {
	var self = Ti.UI.createWindow();
	var progressContainer = Ti.UI.createView({
		width : 300,
		height : 300
	});
	var label = Ti.UI.createLabel({
		text : "Lade aktuellen Regenradarfilm vom Server des Deutschen Wetterdienstes herunter (ca. 5MB)",
		font : {
			fontSize : 20,
			fontWeight : "bold"
		},top :20,left:10,right:10
	});

	var progressView = require('ti.waterwaveprogress').createView({
		maxProgress : 100,
		ringWidth : 4,
		waterColor : '#00ff00',
		waterBgColor : '#00aa00',
		ring2WaterWidth : 10.1,
		fontSize : 22,
		showRing : true,
		showNumerical : true,
		crestCount : 2.2,
		amplitude : 0.4,
		α : 0.6
	});
	progressContainer.add(progressView);
	self.addEventListener("focus", function() {
		self.add(progressContainer);
		self.add(label);
		FTP.createDownload({
			url : "ftp://gds32025:cEtPCZbY@ftp-outgoing2.dwd.de:21/gds/specials/radar/Radarfilm_WEB_DL.gif",
			file : gifFile.nativePath,
			keepalive : false,
			onload : function(e) {
			},
			onerror : function(e) {
			},
			onprogress : function(e) {
				if (e.progress)
					progressView.setProgress(e.progress * 100);
				if (e.complete == true) {
					self.radar = GIF.createGifView({
						image : gifFile.nativePath,
						width : Ti.UI.FILL,
						height : 450,
						autoStart : true
					});
					self.remove(progressContainer);
					self.add(self.radar);
					self.remove(label);

				}
			}
		});
	});
	self.addEventListener("blur", function() {
		self.remove(self.radar);
		self.remove(progressContainer);
		self.remove(label);

	});

	return self;
};

