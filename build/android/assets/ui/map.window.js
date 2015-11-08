var Map=require("ti.map"),Polygon=require("vendor/geopolygon");require("vendor/versionsreminder")(),module.exports=function(){function e(e){Ti.Media.vibrate([1,1]),e.annotation?e.annotation.pdf&&"pin"!=e.clicksource?require("ui/pdf.window")({pdf:e.annotation.pdf,line:e.annotation.line.replace("l","")}).open():e.annotation.wiki&&"pin"!=e.clicksource&&"polygon"!==e.clicksource&&(require("ui/wiki.window")({title:e.annotation.title,url:e.annotation.wiki}).open(),t.map.deselectAnnotation(t.map.dummyAnnotation),e.annotation.wiki=void 0):"polygon"==e.clicksource&&(t.map.dummyAnnotation.setLatitude(e.source.center.y),e.source.wiki?(t.map.dummyAnnotation.rightButton="/assets/wiki.png",t.map.dummyAnnotation.wiki=e.source.wiki,t.map.deselectAnnotation(t.map.dummyAnnotation)):(t.map.dummyAnnotation.rightButton=null,t.map.dummyAnnotation.wiki=void 0),t.map.dummyAnnotation.setLongitude(e.source.center.x),t.map.dummyAnnotation.setTitle(e.source.description),t.map.selectAnnotation(t.map.dummyAnnotation))}var t=Ti.UI.createWindow({backgroundColor:"#092B55"});return t.map=Map.createView({userLocation:Ti.Geolocation.locationServicesEnabled?!0:!1,region:{latitude:53.51,longitude:9.95,longitudeDelta:.1,latitudeDelta:.1},enableZoomControls:!1}),t.map.dummyAnnotation=Map.createAnnotation({image:"/assets/null.png",latitude:0,longitude:0}),t.map.addAnnotation(t.map.dummyAnnotation),t.map.addEventListener("click",e),t.mapOverlays=require("ui/map.overlays")(),t.removeOverlay=function(e){if(e.name&&!e.geojson){var i=t.mapOverlays[e.name];i[0].points?i.forEach(function(e){t.map.removeRoute(e)}):i[0].latitude&&i.forEach(function(e){t.map.removeAnnotation(e)})}else if(e.geojson){var n=require(e.name);n.features.forEach(function(i){var n=i.properties[e.property];t.map.removePolygon(t.mapOverlays[e.name][n])})}},t.addOverlay=function(e){if(e.geojson){var i=require(e.name);t.mapOverlays[e.name]||(t.mapOverlays[e.name]={}),i.features.forEach(function(i){var n=i.properties[e.property],a=i.geometry.coordinates[0].map(function(e){return{latitude:e[1],longitude:e[0]}}),r=new Polygon(i.geometry.coordinates[0]);t.mapOverlays[e.name][n]=Map.createPolygon({center:r.getCentroid(),area:r.getArea(),wiki:i.properties.wiki,fillColor:"Terminal"==e.property?"#5660":"#5008",description:i.properties[e.property],points:a,strokeWidth:1,strokeColor:"gray"}),t.map.addPolygon(t.mapOverlays[e.name][n])})}else{var n=t.mapOverlays[e.name];n&&(n[0].points?n.forEach(function(e){t.map.addRoute(e)}):n[0].latitude&&n.forEach(function(e){t.map.addAnnotation(e)}))}},t.addEventListener("open",function(){t.add(t.map)}),t};