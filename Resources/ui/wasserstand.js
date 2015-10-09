const LATTENHEIGHT = 520,
    LATTENWIDTH = 10,
    RASTER = LATTENHEIGHT / 29.1;

var max = 0;

var Widget = function(args) {
	var self = Ti.UI.createView({
		backgroundImage : '/assets/leerlatte.png',
		width : LATTENWIDTH * 2,
		height : LATTENHEIGHT,
		right : 0,
		top : 0,
		zIndex : 99,
		touchEnabled : false,
	});
	self.hand = Ti.UI.createLabel({
		text : '▶︎',
		font : {
			fontSize : 30
		},
		top : 200,
		right : 0,
		visible : false,
		zIndex : 100,
		color : 'red',
		opacity : 0.75
	});
	self.add(self.hand);
	var lattenpositionen = [0, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28];
	self.addScala = function(args) {
		self.children.forEach(function(child) {
			 self.remove(child);
		});
		var max = args.current;
		for (var i = 0; i < lattenpositionen.length; i++) {
			var slot = lattenpositionen[i];
			var text = Math.round(args.current * 10 - slot);
			var color = text > 0 ? 'black' : 'red';
			text = Math.abs(text);
			if (text < 10)
				text = '0' + text;
			var options = {
				color : color,
				font : {
					fontSize : 13.2,
					fontFamily : 'SteelfishRg-Bold'
				},
				height : Ti.UI.SIZE,
				top : 2 + RASTER * slot,
				text : text,
			};
			if (slot % 2) {
				options.left = 1;
			} else {
				options.left = 11;
			}
			self.add(Ti.UI.createLabel(options));
		}

	};
	self.moveTo = function(direction, level) {
		self.hand.setTop(direction == '-' ? 0 : LATTENHEIGHT);
		self.hand.show();
		console.log(max + ' l=' + level);
		self.hand.animate({
			top : 10 * RASTER * (max - level),
			duration : 2000
		});
	};
	self.hide = function() {
		self.hand.hide();
	};
	return self;
};

Widget.prototype = {
	moveTo : function(direction, level) {
		self.hand.setTop(direction == '-' ? 0 : LATTENHEIGHT);
		self.hand.show();

	},
	hide : function() {
		self.hand.hide();
	}
};

exports.createView = function(args) {
	return new Widget(args);
};
