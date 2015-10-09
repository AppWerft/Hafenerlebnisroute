module.exports = function(event) {
	var row = Ti.UI.createTableViewRow({
		height : '50dp',
		backgroundColor : 'white'
	});
	//if (event["in_past"])
	//	continue;
	var color = event["in_past"] ? '#bbb' : 'black';
	var daylabel = Ti.UI.createLabel({
		text : event['i18n'] + ' Uhr',
		left : 10,
		color : color,
		top : 5,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 18,
			fontFamily : 'Aller Bold'
		}
	});
	var typelabel = Ti.UI.createLabel({
		text : (event.direction == 'HW') ? 'Hochwasser' : 'Niedrigwasser',
		left : 10,
		color : color,
		font : {
			fontFamily : 'Aller',
			fontSize : 14
		},
		bottom : 5,
		height : 20
	});
	var levellabel = Ti.UI.createLabel({
		text : event.level + 'm',
		color : '#aaa',
		font : {
			fontSize : 32,
			fontFamily : 'Aller Bold'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'right',
		right : 50
	});
	row.add(daylabel);
	row.add(levellabel);
	row.add(typelabel);
	return row;
};
