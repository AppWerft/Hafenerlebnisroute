exports.tides = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white',
		itemId : ''
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'time',
		properties : {
			left : 5,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 22,
				fontFamily : 'Aller'
			},
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'type',
		properties : {
			left : 5,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 22,
				fontFamily : 'Aller'
			},
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'level',
		properties : {
			left : 5,
			touchEnabled : false,
			top : 5,
			color : '#777',
			font : {
				fontSize : 22,
				fontFamily : 'Aller'
			},
		}

	}]
};
