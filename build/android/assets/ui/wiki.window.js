module.exports=function(e){var t=(arguments[0]||{},Ti.UI.createWindow({}));t.backgroundColor="white";var i=Ti.UI.createWebView({url:e.url,enableZoomControls:!1,borderRadius:1});return t.add(i),i.addEventListener("load",function(){t.spinner&&t.spinner.hide()}),t.addEventListener("androidback",function(){i.canGoBack()?i.goBack():t.close()}),t.spinner=Ti.UI.createActivityIndicator({height:Ti.UI.SIZE,width:Ti.UI.SIZE,visible:!0,zIndex:999,style:"iPhone OS"===Ti.Platform.name?Ti.UI.iPhone.ActivityIndicatorStyle.BIG:Ti.UI.ActivityIndicatorStyle.BIG}),t.add(t.spinner),setTimeout(function(){t.remove(t.spinner)},5e3),t.addEventListener("open",function(t){var i=require("com.alcoapps.actionbarextras");i.setTitle(e.title),i.setSubtitle("Wikipedia"),i.setFont("Aller Bold"),i.subtitleColor="#ccc";var n=t.source.getActivity();n&&(n.actionBar.displayHomeAsUp=!0,n.actionBar.onHomeIconItemSelected=function(){t.source.close()})}),t};