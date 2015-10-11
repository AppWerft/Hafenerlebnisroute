var CANVASHEIGHT=240,LDF=Ti.Platform.displayCaps.logicalDensityFactor,Tide=new(require("controls/bsh.proxy")),Moment=require("vendor/moment"),swipeRefreshModule=require("com.rkam.swiperefreshlayout");module.exports=function(){function e(){Tide.getPrediction(t.id,{onOk:function(e){if(i.swipeRefreshContainer.setRefreshing(!1),null==e)return void alert("Für diesen Messpunkt liegen für das Jahr 2015 leider keine Angaben vor. ");n.addScala({current:Math.ceil(e.current.level)+1}),e.current.level?n.moveTo(e.current.direction,e.current.level):n.hide();null==e&&(i.swipeRefreshContainer.setRefreshing(!1),alert("Keine Tidedaten vorhanden – offline?")),i.scheduler.sections=e.predictions.map(function(e,t){var i=Ti.UI.createTableViewSection({headerView:require("ui/tide.headerview")(t,e.label)});return e.tides.forEach(function(e){e.in_past||i.add(require("ui/tide.row")(e))}),i})},onerror:function(){i.swipeRefreshContainer.setRefreshing(!1)}})}var t={label:"Hamburg, St. Pauli",gps:"53.545555,9.97",id:"DE__508P",skn:1.9},i=Ti.UI.createWindow();i.add(Ti.UI.createImageView({image:"/assets/pano.png",top:0,width:1840,height:700})),i.children[0].animate({left:-320,duration:1500});var n=require("ui/wasserstand").createView();i.tideCanvas=require("com.wwl.canvas").createCanvasView({backgroundColor:"transparent",bottom:-CANVASHEIGHT,width:Ti.UI.FILL,height:Ti.UI.FILL,opacity:.6,touchEnabled:!1,height:CANVASHEIGHT,zIndex:9});return i.scheduler=Ti.UI.createTableView({top:0,bottom:0,height:Ti.UI.FILL}),i.swipeRefreshContainer=swipeRefreshModule.createSwipeRefresh({view:i.scheduler,top:0,bottom:0,height:Ti.UI.FILL,width:Ti.UI.FILL}),i.swipeRefreshContainer.addEventListener("refreshing",e),i.scheduler.addEventListener("scroll",function(){}),i.tideCanvas.addEventListener("load",function(){i.tideCanvas.animate({bottom:0,duration:1e3});var e={all:Tide.getChartData(t.id).join(",")},n=Ti.Platform.displayCaps.platformWidth/LDF;i.tideCanvas.lineWidth=1,i.tideCanvas.strokeStyle="#092B55",i.tideCanvas.antiAliasing=!0,i.tideCanvas.beginPath(),i.tideCanvas.moveTo(0,CANVASHEIGHT);for(var a=Tide.getChartData(t.id),r=(new Date).getTime(),l=e.all.length,d=0;l-1>d&&n*LDF>d;d+=1)if("number"==typeof a[d]){{a[d]/5*CANVASHEIGHT*LDF}i.tideCanvas.moveTo(d,CANVASHEIGHT*LDF),i.tideCanvas.lineTo(d,(1-a[d]/5)*CANVASHEIGHT*LDF)}console.log("Info: rendering of canvas: "+((new Date).getTime()-r)),i.tideCanvas.closePath(),i.tideCanvas.stroke(),i.tideCanvas.addEventListener("click",function(){e.active="all"==e.active?"narrow":"all"})}),i.add(i.swipeRefreshContainer),i.add(i.tideCanvas),Ti.Android&&i.addEventListener("focus",function(){}),Ti.Android&&i.addEventListener("blur",function(){}),Ti.Android&&i.addEventListener("open",function(){e(),Ti.UI.createNotification({message:"Gezeitendaten für St. Pauli vom Bundesamt für Seeschiffahrt und Hydrographie"}).show()}),i.add(n),i};