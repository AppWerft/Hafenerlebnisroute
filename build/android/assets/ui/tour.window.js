module.exports=function(e){console.log(e);var t=(arguments[0]||{},Ti.UI.createWindow({backgroundColor:"white"}));return t.add(Ti.UI.createScrollView({schrollType:"vertical",layout:"vertical"})),t.addEventListener("open",function(i){var n=require("model/touren")[e.route.itemId];n.forEach(function(e){if(e.text&&t.children[0].add(Ti.UI.createLabel({left:10,right:10,top:10,color:"#444",font:{fontSize:18,fontFamily:"Aller"},text:e.text})),e.image){var i=e.image.length<16?"https://raw.githubusercontent.com/AppWerft/Hafenerlebnisroute/master/hafen/"+e.image:e.image,n=Ti.UI.createImageView({top:10,image:i,bigimage:i.replace(/\.png$/,".jpg"),defaultImage:"/assets/defaultimage.png",width:Ti.UI.FILL,height:"auto"});require("vendor/imagecache")(i,n),t.children[0].add(n)}});var a=require("com.alcoapps.actionbarextras");a.setTitle("Hafenerlebnistour"),a.setSubtitle(e.titletext),a.setBackgroundColor("#f00"),a.subtitleColor="#ccc";var r=i.source.getActivity();r&&(r.actionBar.displayHomeAsUp=!0,r.actionBar.onHomeIconItemSelected=function(){i.source.close()},r.onCreateOptionsMenu=function(){var t=arguments[0].menu;t.clear(),t.add({title:"Route",icon:Ti.App.Android.R.drawable.ic_action_map,showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}).addEventListener("click",function(){require("ui/tourmap.window")(e.route).open()})},r.invalidateOptionsMenu())}),t.children[0].addEventListener("singletap",function(e){if("Ti.UI.ImageView"==e.source.apiName){require("ui/zoom.window")({image:e.source.bigimage,title:"Alter Elbtunnel – Finkenwerder"}).open()}}),t};