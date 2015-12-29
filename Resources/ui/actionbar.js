var АктйонБар = require('com.alcoapps.actionbarextras');

var MENUITEMS = [{
	title : 'Aussichtspunkte',
	name : 'aussicht',
	enabled : true
}, {
	title : 'Sehenswürdigkeiten',
	name : 'sehens',
	enabled : true
}, {
	title : 'Fährstellen',
	name : 'faehre',
	enabled : true
}, {
	title : 'Gastro',
	name : 'gastro',
	enabled : false
}, {
	title : 'Schiffsliegeplätze',
	name : 'model/berths',
	geojson : true,
	enabled : false,
	property : 'Liegeplatz'
}, {
	title : 'Terminals',
	name : 'model/terminals',
	geojson : true,
	enabled : false,
	property : 'Terminal'
}];



module.exports = function(_event) {
	var activity = _event.source.getActivity();
	var mapwin = _event.source.tabs[0].window;
	var handleCreateMenu = function(_menuevent) {
		var menu = _menuevent.menu;
		menu.clear();
		function toggleOverlay(_e) {
			var options = MENUITEMS[_e.source.itemId];
			if (_e.source.isChecked()) {
				_e.source.setChecked(false);
				mapwin.removeOverlay(options);
			} else {
				_e.source.setChecked(true);
				mapwin.addOverlay(options);
			}
			_event.source.setActiveTab(0);
		}
		menu.add({
			title : 'Touren',
			icon : Ti.App.Android.R.drawable.ic_action_radler,
			itemId : 99,
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		}).addEventListener("click", function() {
			var routes = require('model/routes').getAllRouteNames();
			var picker = require("yy.tidialogs").createMultiPicker({
				title : "Hafentouren",
				options : routes.all,
				selected : Ti.App.Properties.hasProperty('ROUTES')?Ti.App.Properties.getList('ROUTES'):routes.selected,
				okButtonTitle : "OK",
			});
			picker.addEventListener('click',function(e){
				mapwin.updateRoutes(e.selections);
			});
			picker.show();
			
		});
		MENUITEMS.forEach(function(item, itemId) {
			menu.add({
				title : item.title,
				checkable : (item.enabled !== undefined) ? true : false,
				itemId : itemId,
				checked : (item.enabled) ? true : false,
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			}).addEventListener("click", toggleOverlay);
		});
		var Map = require('ti.map');
		var maptypeItem = menu.add({
			title : 'Luftbild',
			itemId : 98,
			checkable : true,
			checked : false,
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
		});
		maptypeItem.addEventListener("click", function() {
			maptypeItem.setChecked(maptypeItem.checked ? false : true);
			mapwin.map.setMapType((maptypeItem.checked) ? Map.HYBRID_TYPE : Map.NORMAL_TYPE);
		});
	};
	АктйонБар.setTitle('Hafenradeln');
	АктйонБар.setFont('Aller Bold');
	АктйонБар.backgroundColor = '#444';
	АктйонБар.setSubtitle('Hamburg');
	if (activity) {
		activity.actionBar.logo = '/images/kran.png';
		activity.onCreateOptionsMenu = handleCreateMenu;
		activity.invalidateOptionsMenu();
	} else
		console.log('Warning: no activity');
	MENUITEMS.forEach(function(item) {
		if (item.enabled)
			mapwin.addOverlay(item);
	});
};
