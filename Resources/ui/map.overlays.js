var Map = require('ti.map');

function createRouteView(points) {
	return Map.createRoute({
		points : points.map(function(p) {
			return {
				latitude : p[0],
				longitude : p[1]
			};
		}),
		color : '#090',
		enabled : true,
		width : Ti.Platform.displayCaps.logicalDensityFactor * 4
	});
}

module.exports = function() {
	var routeViews = {};
	var enabledRoutegroups = [];
	var routes = require('model/routes').getAllRoutes();
	return;
	var names = Object.getOwnPropertyNames(routes);
	names.forEach(function(name){
		if (routes[name].enabled) enabledRoutegroups.push(routes[name]);
	});
	enabledRoutegroups.forEach(function(routegroup) {
		routegroup.polylines.forEach(function(polyline, ndx) {
			console.log(polyline);
			routeViews[routegroup.name] = createRouteView(polyline[ndx]);
		});
	});
	console.log(routeViews);
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
