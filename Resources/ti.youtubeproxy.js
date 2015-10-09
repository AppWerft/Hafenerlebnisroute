var Promise = require('org.favo.promise');

var GOOGLEAPIKEY = Ti.App.Properties.getString('GOOGLEAPIKEY');
const ENDPOINT = 'https://www.googleapis.com/youtube/v3/';

var _getPlaylistsByChannelId = function(channelid) {
	var etag;
	var defer = Promise.defer();
	function handleResponse(response) {
		var result = JSON.parse(response);
		var items = result.items.map(function(item) {
			return {
				title : item.snippet.title,
				data : item.id
			};
		});
		defer.resolve(items);
	}

	function handleError(e) {
		defer.reject(e);
	}

	var client = Ti.Network.createHTTPClient({
		onload : handleResponse,
		onerror : handleError
	});
	var url = ENDPOINT + "playlists?maxResults=50&part=snippet%2CcontentDetails&channelId=" + channelid + "&key=" + GOOGLEAPIKEY;
	console.log(url);
	client.open('GET', url);
	client.send();
	return defer;
};

var _getVideosByplaylistId = function() {
	var options = arguments[0] || {};
	var etag;
	var defer = Promise.defer();
	function handleResponse(playlist) {
		if (etag || etag != playlist.etag) {
			defer.resolve(playlist.items.map(function(v) {

				return {
					image : v.snippet.thumbnails.default.url.replace(/default/, 'hqdefault'),
					title : v.snippet.title.replace(/^[\s]+/g, ''),
					pubdate : v.snippet.publishedAt,
					id : v.snippet.resourceId.videoId,
					description : v.snippet.description.split('\n')[0],
				};
			}));
		}
	}

	function handleError(e) {
		defer.reject(e);
	}

	if (options['default']) {
		etag = options['default'].etag;
		handleResponse(options['default']);
	}
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			handleResponse(JSON.parse(this.responseText));
		},
		onerror : handleError
	});
	var url = ENDPOINT + 'playlistItems?&maxResults=50&part=snippet%2&playlistId=' + options.id + '&key=' + GOOGLEAPIKEY;
	
	client.open('GET', url);
	client.setRequestHeader('Accept-Encoding', 'gzip');
	client.setRequestHeader('User-Agent', 'Titanium engine (gzip)');
	client.send();

	return defer;
};

var _getUrlById = function(id) {
	var defer = Promise.defer();
	/*VideoProvider.getVideoUrl('youtube', id).then(function onSuccess(url) {
	 defer.resolve(url);
	 }, function onError(e) {
	 Ti.API.error(e);
	 });*/
	return defer;
};

exports.getPlaylistsByChannelId = _getPlaylistsByChannelId;
exports.getVideosByplaylistId = _getVideosByplaylistId;
exports.getUrlById = _getUrlById;
