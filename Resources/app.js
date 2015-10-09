! function() {
	Ti.UI.backgroundColor = '#092B55';
	var navigationControler = require('ui/main')();
	navigationControler.open();
	navigationControler.addEventListener('open', function() {
		var Tide = new (require('controls/bsh.proxy'))();
		Tide.loadStations(true, {
			onload : function() {
				Ti.UI.createNotification({
					message : 'Tidedaten mit dem BSH synchronisiert.'
				}).show();
			},
			onprogress : function() {
			}
		});
	});

	//setTimeout(require('ui/main'), 5000);
	//http://jgilfelt.github.io/android-actionbarstylegenerator/#name=Hafen&compat=appcompat&theme=dark&actionbarstyle=solid&texture=0&hairline=1&neutralPressed=1&backColor=f12c18%2C100&secondaryColor=092b55%2C100&tabColor=fff%2C100&tertiaryColor=303030%2C100&accentColor=33B5E5%2C100&cabBackColor=002E3E%2C100&cabHighlightColor=b6b6b6%2C100
}();
