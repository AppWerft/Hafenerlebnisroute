var touren = [{
	title : "Alter Elbtunnel – Finkenwerder",
	dist : 18.8
}, {
	title : "Alter Elbtunnel – Bubendey",
	dist : 17.8
}, {
	title : "Alter Elbtunnel – Veddel",
	dist : 5.4
}, {
	title : "Veddel – Finkenwerder",
	dist : 17.1
}, {
	title : "Veddel – Bubendey",

	dist : 16.1
}];

module.exports = function() {

	var self = Ti.UI.createWindow();
	self.add(Ti.UI.createImageView({
		image : '/assets/pano.png',
		top : 0,
		width : 1840,
		height : 700
	}));
	self.children[0].animate({
		left : -320,
		duration : 1500
	});

	self.list = Ti.UI.createTableView({
		top : 0,
		bottom : 0,
		data : touren.map(function(t) {
			var row = Ti.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				layout : 'vertical',
				backgroundColor : 'white'
			});
			row.add(Ti.UI.createLabel({
				text : t.title,
				left : 10,
				top : 10,
				font : {
					fontSize : 22,
					fontFamily : 'Aller Bold'
				},
				color : '#444'
			}));
			row.add(Ti.UI.createLabel({
				text : 'Länge: ' + t.dist + ' km',
				left : 10,
				top : 10,
				bottom:10,
				font : {
					fontSize : 16,
					fontFamily : 'Aller'
				},
				color : '#444'
			}));
			return row;
		}),
		height : Ti.UI.FILL
	});

	self.add(self.list);
	return self;
};

