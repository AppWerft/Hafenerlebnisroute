module.exports = function(url, imageViewObject) {
	if (!url || !imageViewObject)
		return;
	var filename = Ti.Utils.md5HexDigest(url) + '.png';
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
	if (file.exists() == true) {
		console.log(file.nativePath);
		imageViewObject.image = file.nativePath;
	} else {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				if (this.status == 200) {
					file.write(this.responseData);
					imageViewObject.setImage(file.nativePath);
				};
			}
		});
		xhr.open('GET', url);
		xhr.send();
	}
};
