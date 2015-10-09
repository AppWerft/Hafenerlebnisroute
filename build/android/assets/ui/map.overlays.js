var Map=require("ti.map");module.exports=function(){return{radnetz:["rossdamm","neuhof","bubendey","waltershof","almig","veddel","theater"].map(function(e){return Map.createRoute({points:require("model/routes")[e].map(function(e){return{latitude:e[0],longitude:e[1]}}),enabled:!1,color:"#F80009",width:5*Ti.Platform.displayCaps.logicalDensityFactor})}),erlebnis:[Map.createRoute({points:require("model/routes").green,color:"#090",enabled:!0,width:5*Ti.Platform.displayCaps.logicalDensityFactor})],sehens:require("model/pois").red.map(function(e){return Map.createAnnotation({latitude:e.ll[0],image:"/images/red.png",longitude:e.ll[1],title:e.title,enabled:!0,subtitle:e.subtitle})}),aussicht:require("model/pois").star.map(function(e){return Map.createAnnotation({latitude:e.ll[0],enabled:!0,image:"/images/star.png",longitude:e.ll[1],title:e.title})}),gastro:require("model/pois").besteck.map(function(e){return Map.createAnnotation({latitude:e.ll[0],image:"/images/besteck.png",longitude:e.ll[1],title:e.title})}),faehre:require("model/pois").ferries.map(function(e){return Map.createAnnotation({latitude:e.ll[0],enabled:!0,image:"/images/"+e.line+".png",longitude:e.ll[1],rightButton:"/images/faehre.png",leftButton:"/assets/hadag.png",title:e.title,pdf:e.pdf,line:e.line,subtitle:e.subtitle})})}};