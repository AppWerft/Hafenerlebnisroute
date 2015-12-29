var Map = require('ti.map');


module.exports = function() {
	
	return {
		sehens : require('model/pois').red.map(function(p) {
			return Map.createAnnotation({
				latitude : p.ll[0],
				image : '/images/red.png',
				longitude : p.ll[1],
				title : p.title,
				enabled : true,
				subtitle : p.subtitle
			});
		}),
		aussicht : require('model/pois').star.map(function(p) {
			return Map.createAnnotation({
				latitude : p.ll[0],
				enabled : true,
				image : '/images/star.png',
				longitude : p.ll[1],
				title : p.title,
				subtitle : p.subtitle
			});
		}),
		gastro : require('model/pois').besteck.map(function(p) {
			return Map.createAnnotation({
				latitude : p.ll[0],
				image : '/images/besteck.png',
				longitude : p.ll[1],
				title : p.title,
				subtitle : p.subtitle
			});
		}),
		faehre : require('model/pois').ferries.map(function(p) {
			return Map.createAnnotation({
				latitude : p.ll[0],
				enabled : true,
				image : '/images/' + p.line + '.png',
				longitude : p.ll[1],
				rightButton : '/images/faehre.png',
				leftButton : '/assets/hadag.png',
				title : p.title,
				pdf : p.pdf,
				line : p.line,
				subtitle : p.subtitle
			});
		})
	};
};
