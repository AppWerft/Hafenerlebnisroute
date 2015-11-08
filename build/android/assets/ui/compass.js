var Matrix=Ti.UI.create2DMatrix(),GeoTools=require("de.appwerft.geotools"),Widget=function(e){function t(e){e.success&&(n.myposition={"φ":e.coords.latitude,"λ":e.coords.longitude},console.log(e.coords.accuracy),n.mylocprecision=0)}function i(e){var t=e.heading.trueHeading||e.heading.magneticHeading;if(t!=n.lastheading&&n.myposition&&n.nodeposition){var i=GeoTools.getDistBearing(n.myposition.φ,n.myposition.λ,n.nodeposition.φ,n.nodeposition.λ);n.arrowView.transform=Ti.UI.create2DMatrix({rotate:i.bearing-t}),n.distanceView.setText(Math.round(i.distance)+" m"),n.lastheading=t}}var n=this;return this.route=e,this.nodeposition={"φ":this.route[0][0],"λ":this.route[0][1]},this.view=Ti.UI.createView({backgroundColor:"transparent",touchEnabled:!1}),this.arrowView=Ti.UI.createImageView({text:"⬆",color:"#092B55",opacity:0,zIndex:99,touchEnabled:!1,font:{fontSize:290},image:"/assets/pfeil.png",width:300,height:200}),this.titleView=Ti.UI.createLabel({text:e.name,width:Ti.UI.FILL,color:"#F9EABA",height:0,top:0,textAlign:"center",backgroundColor:"#5000",font:{fontSize:32,fontFamily:"Aller"}}),this.distanceView=Ti.UI.createLabel({text:"∞",touchEnabled:!1,color:"#092B55",opacity:.6,touchEnabled:!1,height:Ti.UI.SIZE,bottom:5,font:{fontSize:100,fontFamily:"Aller Bold"}}),this.view.add(this.arrowView),this.view.add(this.titleView),this.view.add(this.distanceView),this.view.start=function(){n.arrowView.animate({opacity:.3,duration:1800}),Ti.Geolocation.locationServicesEnabled?(Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({name:Ti.Geolocation.PROVIDER_GPS,minUpdateDistance:10,minUpdateTime:10})),Ti.Geolocation.Android.manualMode=!0,Ti.Geolocation.addEventListener("heading",i),Ti.Geolocation.addEventListener("location",t)):Ti.UI.createNotification({message:"Wenn schon offline, dann doch wenigstens GPS ;-))"}).show()},this.view.stop=function(){Ti.Geolocation.removeEventListener("heading",i),Ti.Geolocation.removeEventListener("location",t)},this.view};exports.createView=function(e){return new Widget(e)};