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
				top : 10,
				color : '#444',
				font : {
					fontSize : 18,
					fontFamily : 'Aller'
				},
				text : item.text
			}));
		}
		if (item.image) {
			var url = 'https://raw.githubusercontent.com/AppWerft/Hafenerlebnisroute/master/hafen/' + item.image;
			console.log(url);
			self.children[0].add(Ti.UI.createImageView({
				top : 10,
				image : url,
				defaultImage : '/assets/defaultimage.png',
				width : Ti.UI.FILL,
				height : 'auto'
			}));
		}
	});
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hafenerlebnistour');
		АктйонБар.setSubtitle('Alter Elbtunnel – Finkenwerder');
		АктйонБар.setBackgroundColor('#f00');
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
		}

	});
	self.children[0].addEventListener('singletap', function(_e) {
		if (_e.source.apiName == 'Ti.UI.ImageView') {
			var zoom = require('ui/zoom.window')({
				image  : _e.source.getImage().replace(/\.png/,'.jpg'),
				title: 'Alter Elbtunnel – Finkenwerder'
			}).open();
		}
	});
	return self;
};
