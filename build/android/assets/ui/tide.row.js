module.exports=function(e){var t=Ti.UI.createTableViewRow({height:"50dp",backgroundColor:"white"}),i=e.in_past?"#bbb":"black",n=Ti.UI.createLabel({text:e.i18n+" Uhr",left:10,color:i,top:5,height:Ti.UI.SIZE,font:{fontSize:18,fontFamily:"Aller Bold"}}),a=Ti.UI.createLabel({text:"HW"==e.direction?"Hochwasser":"Niedrigwasser",left:10,color:i,font:{fontFamily:"Aller",fontSize:14},bottom:5,height:20}),l=Ti.UI.createLabel({text:e.level+"m",color:"#aaa",font:{fontSize:32,fontFamily:"Aller Bold"},height:Ti.UI.SIZE,width:Ti.UI.SIZE,textAlign:"right",right:50});return t.add(n),t.add(l),t.add(a),t};