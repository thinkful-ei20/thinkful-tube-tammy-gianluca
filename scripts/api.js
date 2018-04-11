/* global API_KEY */
const api = (function(){
	const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
	const fetchVideos = function(query, callback) {
		let data = {
			maxResults: '25',
			part: 'snippet',
			key: API_KEY,
			...query,
		};
		$.getJSON(BASE_URL, data, function(response) {
			callback(decorateResponse(response));
		});
	};

	const decorateResponse = function(response) {
		let pagetokens = {prev:response.prevPageToken, next:response.nextPageToken};
		let videos = response.items.map(item => {
			let id = item.id.videoId;
			let title = item.snippet.title;
			let thumbnail = item.snippet.thumbnails.default.url;
			let channelId = item.snippet.channelId;
			let channelTitle = item.snippet.channelTitle;
			return {
				id,
				title,
				thumbnail,
				channelId,
				channelTitle,
			};
		});

		return {
			videos,
			pagetokens,
		};
	};

	return {
		fetchVideos
	};
}());
