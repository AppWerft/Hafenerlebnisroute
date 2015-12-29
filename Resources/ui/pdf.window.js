var getFromCache = function(_pdfurl, _onload) {
	var pdffile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Ti.Utils.md5HexDigest(_pdfurl) + '.pdf');
	if (pdffile.exists()) {
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
		self.documentview = Ti.UI.createWebView({
			url : options.pdf,
			borderRadius : 1,
			top : 120
		});
		self.add(self.documentview);
	} else {
		var READER_MODULE = require("com.mykingdom.mupdf");
		getFromCache(options.pdf, function(_e) {
			self.documentview = READER_MODULE.createView({
				file : _e.path,
				top : 70
			});
			self.documentview.setScrollingDirection(READER_MODULE.DIRECTION_HORIZONTAL);
			self.add(self.documentview);
		});
	}
	self.addEventListener('open', function(_event) {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Hadag');
		АктйонБар.setSubtitle('Linie' + options.line);
		АктйонБар.setBackgroundColor('#444');
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
