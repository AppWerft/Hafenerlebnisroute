var Moment = require('vendor/moment');
var getDistance = function(lat1, lon1, lat2, lon2) {
	var R = 6371000;
	// m (change this constant to get miles)
	var dLat = (lat2 - lat1) * Math.PI / 180;
	var dLon = (lon2 - lon1) * Math.PI / 180;
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return Math.round(d);
};
var splitIntoDays = function(sets) {
	var days = [];
	var today = Moment().startOf('day');
	var wds = ['Sonntag','Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
	for (var i = 0; i < sets.length; i++) {
		var set = sets[i];
		var ndx, label;
		ndx = Moment.unix(set.timestamp).diff(today, 'days');
		if (ndx < 3) {
			label = ['Heute', 'Morgen', 'Übermorgen'][ndx];
		} else {
			label = 'nächster ' + wds[Moment.unix(set.timestamp).format('e')];
		}
		if (!days[ndx])
			days[ndx] = {};
		days[ndx].label = label;
		if (!days[ndx].tides)
			days[ndx].tides = [];
		days[ndx].tides.push({
			"i18n" : Moment.unix(set.timestamp).format('HH:mm'),
			"direction" : set.direction,
			"level" : set.level,
			"in_past" : (Moment().diff(Moment.unix(set.timestamp)) > 0) ? true : false
		});
	}
	return days;
};
var getCurrent = function(sets) {
	/*
	if (sets[0].level) {
		var min = 99999;
		var max = 0;
		// Extrema:
		for (var i = 0; i < sets.length; i++) {
			if (min < sets[i].level)
				min = sets[i].level;
			if (max > sets[i].level)
				max = sets[i].level;
		}
	}*/
	var set = {
		prev : {},
		next : {},
		diff : {
			level : 0,
			time : 0
		},
		current : {
			level : null,
			timeratio : null,
		}
	};
	for (var i = 0; i < sets.length - 1; i++) {
		var date = Moment.unix(sets[i].timestamp);
		if (date.diff(Moment()) <= 0) {
			set.prev = sets[i];
		}
		if (date.diff(Moment()) >= 0) {
			set.next = sets[i];
			break;
		}
	}
	set.diff.time = set.next.timestamp - set.prev.timestamp;
	set.current.timeratio = (Moment().unix() - set.prev.timestamp) / set.diff.time;
	console.log(set);
	try {
		set.diff.level = parseFloat(set.next.level, 10) - parseFloat(set.prev.level, 10);
	} catch(E) {
		console.log('Error 77: ' + E);
	}
	if (set.diff.level != 0 && !isNaN(set.diff.level)) {
		/* Berechnung des aktuellen Pegels */
		// Gesamthub:
		var amp = Math.abs(parseFloat(set.prev.level, 10) - parseFloat(set.next.level, 10));
		var cosinus = Math.cos(set.current.timeratio * Math.PI);
		//console.log(set.diff.level + ' a=' + amp + ' c='+ cosinus);
		if (set.diff.level < 0) {
			// ablaufend
			var level = parseFloat(set.next.level, 10);
			level = (amp / 2 + cosinus * amp / 2 + level);
		} else {
			// auflaufend
			var level = parseFloat(set.prev.level, 10);
			level = (amp / 2 - cosinus * amp / 2 + level);
		}
		set.current.level = level.toFixed(1);
	} else {
		set.current.level = null;
	}
	set.current.direction = (set.prev.type == 'HW') ? '-' : '+';
	set.current.text = (set.diff.level < 0) ? '⬇ ablaufend' : '⬆ auflaufend';
	set.next.zeit = Moment.unix(set.next.timestamp).format('D. MMM  HH:mm');
	return set;
};
/*     Module start    */
var TideAdapter = function() {
	this.locations = require('model/locations').locations;
	console.log(this.locations);
	var db = Ti.Database.open(Ti.App.Properties.getString('dbname'));
	db.execute('CREATE TABLE IF NOT EXISTS tides (id TEXT, ts TEXT,ty TEXT,level TEXT)');
	db.close();
	this.getModus();
	return this;
};



TideAdapter.prototype = {
	loadStations : function(_smartloading, _callbacks) {
		console.log('Info: START data mirroring \==============================================');
		var that = this;
		if (_smartloading) {
			if (this.getStationsStatus().days == Ti.App.Properties.getString('DAYS')) {
				_callbacks.onload({
					ok : true
				});
				return;
			};
		}
		var start = new Date().getTime();
		var tidesrequest = Ti.Network.createHTTPClient({
			ondatastream : function(_e) {
				if (_e.progress < 0)
					_callbacks.onprogress(-_e.progress / 610000);
				else
					_callbacks.onprogress(_e.progress);
			},
			onload : function() {
				var stations = null;
				var stop = new Date().getTime();
				try {
					stations = JSON.parse(this.responseText);
					var stop = new Date().getTime();
				} catch(E) {
					_callbacks.onload({
						ok : false
					});
				}
				if (stations != null) {
					var count = 0;
					var db = Ti.Database.open(Ti.App.Properties.getString('dbname'));
					db.execute('DROP TABlE IF EXISTS tides');
					db.execute('CREATE TABLE IF NOT EXISTS tides (id TEXT, ts TEXT,ty TEXT,level TEXT)');
					db.execute("BEGIN IMMEDIATE TRANSACTION");
					for (var s = 0, len = stations.length; s < len; s++) {
						var id = stations[s].id;
						var val = stations[s].val;
						for (var i = 0; i < val.length; i++) {
							if (val) {
								count++;
								db.execute('INSERT INTO tides VALUES (?,?,?,?)', id, val[i].ts, val[i].ty, val[i].m);
							}
						}
					}
					db.execute("COMMIT TRANSACTION");
					var sql = 'SELECT ts FROM `tides` ORDER BY ts DESC';
					var resultSet = db.execute(sql);
					if (resultSet.isValidRow()) {
						var latest = resultSet.fieldByName('ts');
					}
					resultSet.close();
					db.close();
					var stop = new Date().getTime();
					_callbacks.onload({
						ok : true,
						total : count,
						latest : Moment.unix(latest).format('LLL')
					});
				}
			},
			onerror : function(e) {
				Ti.Android && Ti.UI.createNotification({
					message : 'Nicht im Netz: benutzte alte Daten'
				}).show();
				_callbacks.onload({
					ok : false
				});
			}
		});
		tidesrequest.open('GET', Ti.App.Properties.getString('ENDPOINT') + 'tides.json');
		tidesrequest.setRequestHeader('Accept', 'application/json');
		tidesrequest.send();
	},
	getStationsStatus : function() {
		var db = Ti.Database.open(Ti.App.Properties.getString('dbname'));
		var resultSet = db.execute('SELECT COUNT(*) AS total,MAX(ts) AS max, MIN(ts) AS min  FROM `tides` WHERE ts>?', Moment().unix());
		if (resultSet.isValidRow()) {
			min = resultSet.fieldByName('min');
			max = resultSet.fieldByName('max');
			total = resultSet.fieldByName('total');
			resultSet.close();
			db.close();
			return {
				total : total,
				days : Math.floor((max - min) / 3600 / 24)
			};
		}
		return {
			total : 0,
			days : 0
		};
		db.close();
	},
	getPrediction : function(_id, _callbacks) {
		var that = this;
		this.modus = this.getModus();
		var skndiff = 0;
		for (var i = 0; i < this.locations.length; i++) {
			if (this.locations[i].id == _id) {
				skndiff = this.locations[i].skn;
				break;
			}
		}
		//skndiff = 0;
		var db = Ti.Database.open(Ti.App.Properties.getString('dbname'));
		var resultSet = db.execute('SELECT * FROM tides WHERE id=? ORDER by ts LIMIT 20', _id);
		var tideverlauf = [];	
		while (resultSet.isValidRow()) {
			var nn = parseFloat(resultSet.fieldByName('level') - skndiff);
			var kn = parseFloat(resultSet.fieldByName('level'));
			var level = (this.modus == 'nn') ? nn : kn;
			tideverlauf.push({
				timestamp : parseInt(resultSet.fieldByName('ts'),10),
				level : (isNaN(level)) ? null : level,
				direction : resultSet.fieldByName('ty'),
			});
			resultSet.next();
		}
		resultSet.close();
		db.close();
		
		if (tideverlauf.length > 0) {
			var set = getCurrent(tideverlauf);
			var res = {
				current : set.current,
				next : set.next,
				prev : set.prev,
				predictions : splitIntoDays(tideverlauf)
			};
			if (_callbacks && _callbacks.onOk)
				_callbacks.onOk(res);
			else
				return res;
		}
		return null;
	},
	setModus : function(modus) {
		Ti.App.Properties.setString('MODUS', modus);
		Ti.App.fireEvent('app:modus_changed', {
			modus : modus
		});
	},
	getModus : function(modus) {
		this.modus = (Ti.App.Properties.hasProperty('MODUS')) ? Ti.App.Properties.getString('MODUS') : 'skn';
		return this.modus;
	},

	getChartData : function(_id) {
		var start =new Date().getTime();
		var counter = 0;
		var tides = [];
		var now = Moment();
		var db = Ti.Database.open(Ti.App.Properties.getString('dbname'));
		var resultSet = db.execute('SELECT * FROM tides WHERE id=? ORDER by ts', _id);
		var tides = [];
		while (resultSet.isValidRow()) {
			var level = parseFloat(resultSet.fieldByName('level'));
			tides.push({
				timestamp : parseInt(resultSet.fieldByName('ts')),
				level : (isNaN(level)) ? 0 : level.toFixed(2),
			});
			resultSet.next();
		}
		resultSet.close();
		db.close();
		/********** */
		var chartvalues = [];
		var endzeit;
		for (var i = 0; i < tides.length - 1; i++) {
			endzeit = tides[i + 1].timestamp;
			var interpolatedvalues = getInterpolatedTideValues({
				y1 : tides[i].level,
				y2 : tides[i + 1].level,
				t1 : tides[i].timestamp,
				t2 : tides[i + 1].timestamp,
				steps : 200
			});
			for (var j = 0; j < interpolatedvalues.length; j++) {
				chartvalues.push(interpolatedvalues[j]);
			}
		}
		console.log('Info: calculating of chart: ' + (new Date().getTime()-start));
		return chartvalues;
	}
};

var getInterpolatedTideValues = function(options) {
	var y1 = parseFloat(options.y1);
	var y2 = parseFloat(options.y2);
	var t1 = parseFloat(options.t1);
	var t2 = parseFloat(options.t2);
	var amp = Math.abs(y2 - y1) / 2;
	/* Spitze-Spitze-Wert */
	var secondsofhalvewave = t2 - t1;
	var secondsofnow = Moment().unix();
	var res = [];
	for (var s = 0; s < options.steps; s++) {
		var timestamp = t1 + s / options.steps * secondsofhalvewave;
		var ratio = Math.cos(s / options.steps * Math.PI);
		var value = (y2 > y1)//
		? y1 + amp * (1 - ratio)//
		: y2 + amp * (1 + ratio);
		if (secondsofnow < timestamp) {
			
			res.push(value);
		}
	}
	return res;
};

module.exports = TideAdapter;
