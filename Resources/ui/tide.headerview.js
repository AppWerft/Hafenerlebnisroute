var Moment = require('vendor/moment');

module.exports = function(s, label) {
	var moonphase = require('vendor/moonphases').get(Moment().add(s, 'd'));
	var self = Ti.UI.createView({
		height : 18,
		backgroundColor : '#092B55'
	});
	self.add(Ti.UI.createLabel({
		text : label,
		textAlign : 'left',
		left : 40,
		font : {
			fontSize : 14,
			fontFamily : 'Aller'
		},
		color : 'white'
	}));
	self.add(Ti.UI.createImageView({
		image : '/assets/moon/moon' + Math.round(moonphase.age) + '.png',
		left : 0,
		height : Ti.UI.FILL,
		width : 18
	}));
	return self;
};
