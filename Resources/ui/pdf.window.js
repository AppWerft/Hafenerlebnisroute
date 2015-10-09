var getFromCache = function(_pdfurl, _onload) {
	var pdffile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Ti.Utils.md5HexDigest(_pdfurl) + '.pdf');
	if (pdffile.exists()) {
		console.log('Info:  pdf was alreadystored => displaying');
		_onload({
			path : pdffile,
			file : Ti.Utils.md5HexDigest(_pdfurl)
		});
	} else {
		var xhr = Ti.Network.createHTTPClient({
			onload : function(e) {
				pdffile.write(this.responseData);
				_onload({
					path : pdffile,
					file : Ti.Utils.md5HexDigest(_pdfurl)
				});
			},
			onerror : function(e) {
				console.log(e.error);
			},
			ondatastream : function(_e) {
				/*if (_progresswidget)
					_progresswidget.progress.value = _e.progress;*/
			}
		});
		xhr.open('GET', _pdfurl);
		xhr.send(null);
	}
};


module.exports = function() {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	self.backgroundColor = 'white';
	if (!Ti.Android) {
		var webview = Ti.UI.createWebView({
			url : options.pdf,
			borderRadius : 1
		});
		self.container.add(webview);
	} else {
		var READER_MODULE = require("com.mykingdom.mupdf");
		getFromCache(options.pdf, function(_e) {
			var pdfReader = READER_MODULE.createView({
				file : _e.path
			});
			pdfReader.setScrollingDirection(READER_MODULE.DIRECTION_HORIZONTAL);
			self.add(pdfReader);
		});
	}
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hadag');
		АктйонБар.setSubtitle('Linie' + options.line);
		АктйонБар.setBackgroundColor('#777');
		АктйонБар.subtitleColor = "#ccc";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function(_e) {
				_event.source.close();
	};
		}
		
	});
	return self;
};
