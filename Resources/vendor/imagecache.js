module.exports = function(url, imageViewObject) {
	if (!url || !imageViewObject)
		return;
	var filename = Ti.Utils.md5HexDigest(url+"salt") + '.png';
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, filename);
	if (file.exists() == true) {
		imageViewObject.image = file.nativePath;
	} else {
		var xhr = Ti.Network.createHTTPClient({
			validatesSecureCertificate: false,
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
