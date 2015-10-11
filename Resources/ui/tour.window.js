module.exports = function(args) {
	console.log(args);
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	var data = require('model/touren')[args.route];
	console.log(data);
	self.add(Ti.UI.createScrollView({
		schrollType : 'vertical',
		layout : 'vertical'
	}));
	data.forEach(function(item) {
		if (item.text) {
			self.children[0].add(Ti.UI.createLabel({
				left : 10,
				right : 10,
				top : 5,
				color : '#444',
				font : {
					fontSize : 18,
					fontFamily : 'Aller'
				},
				text : item.text
			}));
		}
		if (item.image) {
			self.children[0].add(Ti.UI.createImageView({
				top : 5,
				image : item.image,
				width : Ti.UI.FILL,
				height : 'auto'
			}));
		}
	});
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hafenerlebnistour');
		АктйонБар.setSubtitle('Alter Elbtunnel – Finkenwerder');
		АктйонБар.setBackgroundColor('#777');
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
		}

	});
	return self;
};
