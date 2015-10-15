module.exports = function(args) {
	console.log(args);
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	self.add(Ti.UI.createScrollView({
		schrollType : 'vertical',
		layout : 'vertical'
	}));
	self.addEventListener('open', function(_event) {
		var data = require('model/touren')[args.route.itemId];
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
				var url = (item.image.length < 16) ? 'https://raw.githubusercontent.com/AppWerft/Hafenerlebnisroute/master/hafen/' + item.image : item.image;
				var imageView = Ti.UI.createImageView({
					top : 10,
					image : url,
					bigimage : url.replace(/\.png$/, '.jpg'),
					defaultImage : '/assets/defaultimage.png',
					width : Ti.UI.FILL,
					height : 'auto'
				});
				require('vendor/imagecache')(url, imageView);
				self.children[0].add(imageView);
			}
		});
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hafenerlebnistour');
		АктйонБар.setSubtitle(args.titletext);
		АктйонБар.setBackgroundColor('#f00');
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
			};
			activity.onCreateOptionsMenu = function() {
				var menu = arguments[0].menu;
				menu.clear();
				menu.add({
					title : 'Route',
					icon : Ti.App.Android.R.drawable.ic_action_map,
					showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				}).addEventListener("click", function() {
					require('ui/tourmap.window')(args.route).open();
				});
			};
			activity.invalidateOptionsMenu();
		}
	});
	self.children[0].addEventListener('singletap', function(_e) {
		if (_e.source.apiName == 'Ti.UI.ImageView') {
			var zoom = require('ui/zoom.window')({
				image : _e.source.bigimage,
				title : 'Alter Elbtunnel – Finkenwerder'
			}).open();
		}
	});
	return self;
};
