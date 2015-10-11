var Map = require('ti.map');

module.exports = function() {
	return {
		radnetz : ['bunthaus','rossdamm', 'neuhof', 'bubendey', 'waltershof', 'almig', 'veddel', 'theater'].map(function(key) {
			return Map.createRoute({
				points : require('model/routes')[key].map(function(p) {
					return {
						latitude : p[0],
						longitude : p[1]
					};
				}),
				enabled : false,
				color : '#F80009',
				width : Ti.Platform.displayCaps.logicalDensityFactor * 5
			});
		}),
		erlebnis : [Map.createRoute({
			points : require('model/routes').green,
			color : '#090',
			enabled : true,
			width : Ti.Platform.displayCaps.logicalDensityFactor * 5
		})],
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
				title : p.title
			});
		}),
		gastro : require('model/pois').besteck.map(function(p) {
			return Map.createAnnotation({
				latitude : p.ll[0],
				image : '/images/besteck.png',
				longitude : p.ll[1],
				title : p.title,subtitle : p.subtitle
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
