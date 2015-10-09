var Moment = require('vendor/moment');
Moment.locale('DE');

var Module = function(v) {
	var row = Ti.UI.createTableViewRow({
		itemId : v.id,
		hasDetail : true,
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	});
	row.add(Ti.UI.createImageView({
		left : 0,
		top : -15,
		image : v.image,
		width : 140,
		height : 105
	}));
	row.add(Ti.UI.createView({
		backgroundColor : 'white',
		left : 0,
		top : 75,
		height : 30
	}));
	row.add(Ti.UI.createLabel({
		left : 5,
		color : '#666',
		height : Ti.UI.SIZE,
		font : {
			fontSize : 14,
			fontFamily : 'Aller'
		},
		top : 80,
		text : 'Erstausstrahlung:\n' + Moment(v.pubdate).format('LL'),
	}));
	
	var container = Ti.UI.createView({
		layout : 'vertical',
		left : 150,
		top : 3,
		right : 5,
		bottom : 5
	});
	row.add(container);
	container.add(Ti.UI.createLabel({
		left : 0,
		color : '#052854',
		font : {
			fontSize : 18,
			fontFamily : 'Aller Bold'
		},
		top : 0,
		right : 10,
		text : v.title,

	}));
	container.add(Ti.UI.createLabel({
		left : 0,
		color : '#333',
		font : {
			fontSize : 14,
			fontFamily : 'Aller'
		},
		top : 0,
		bottom : 5,
		text : v.description,
	}));
	return row;
};
module.exports = Module; 