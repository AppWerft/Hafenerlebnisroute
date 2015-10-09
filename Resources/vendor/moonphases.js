var moment = require('vendor/moment');

exports.get = function(date) {
	function isdayofmonth(y, m, d) {
		if (m != 2) {
			if (1 <= d && d <= dim[m - 1])
				return true;
			else
				return false;
		}

		var feb = dim[1];

		if (isleapyear(y))
			feb += 1;
		// is leap year

		if (1 <= d && d <= feb)
			return true;

		return false;
	}

	function isleapyear(y) {
		var x = Math.floor(y - 4 * Math.floor(y / 4));
		var w = Math.floor(y - 100 * Math.floor(y / 100));
		var z = Math.floor(y - 400 * Math.floor(y / 400));
		if (x == 0) {
			if (w == 0 && z != 0)
				return false;
			else
				return true;
		}
		return false;
	}

	// compute moon position and phase
	function getMoonposit(Y, M, D) {
		var YY = n0;
		var MM = n0;
		var K1 = n0;
		var K2 = n0;
		var K3 = n0;
		var JD = n0;
		var IP = f0;
		var DP = f0;
		var NP = f0;
		var RP = f0;

		// calculate the Julian date at 12h UT
		YY = Y - Math.floor((12 - M ) / 10);
		MM = M + 9;
		if (MM >= 12)
			MM = MM - 12;

		K1 = Math.floor(365.25 * (YY + 4712 ));
		K2 = Math.floor(30.6 * MM + 0.5);
		K3 = Math.floor(Math.floor((YY / 100 ) + 49) * 0.75) - 38;

		JD = K1 + K2 + D + 59;
		// for dates in Julian calendar
		if (JD > 2299160)
			JD = JD - K3;
		// for Gregorian calendar

		// calculate moon's age in days
		IP = normalize((JD - 2451550.1 ) / 29.530588853);
		AG = IP * 29.53;

		IP = IP * 2 * Math.PI;
		// Convert phase to radians

		// calculate moon's distance
		DP = 2 * Math.PI * normalize((JD - 2451562.2 ) / 27.55454988);
		DI = 60.4 - 3.3 * Math.cos(DP) - 0.6 * Math.cos(2 * IP - DP) - 0.5 * Math.cos(2 * IP);

		// calculate moon's ecliptic latitude
		NP = 2 * Math.PI * normalize((JD - 2451565.2 ) / 27.212220817);
		LA = 5.1 * Math.sin(NP);

		// calculate moon's ecliptic longitude
		RP = normalize((JD - 2451555.8 ) / 27.321582241);
		LO = 360 * RP + 6.3 * Math.sin(DP) + 1.3 * Math.sin(2 * IP - DP) + 0.7 * Math.sin(2 * IP);
		// so longitude is not greater than 360!
		if (LO > 360)
			LO = LO - 360;
	}

	// round to 2 decimal places
	function round2(x) {
		return (Math.round(100 * x) / 100.0 );
	}

	// normalize values to range 0...1
	function normalize(v) {
		v = v - Math.floor(v);
		if (v < 0)
			v = v + 1;
		return v;
	}

	var year = parseInt(moment(date).format('YYYY'));
	var month = parseInt(moment(date).format('M'));
	var day = parseInt(moment(date).format('D'));
	var n0 = parseInt("0"), f0 = parseFloat("0.0"), AG = f0, DI = f0, LA = f0, LO = f0;
	var n28 = parseInt("28");
	var n30 = parseInt("30");
	var n31 = parseInt("31");
	var dim = new Array(n31, n28, n31, n30, n31, n30, n31, n31, n30, n31, n30, n31);
	getMoonposit(year, month, day);
	return {
		age : AG,
		dst : round2(DI),
		lat : round2(LA),
		lon : round2(LO)
	};
};

