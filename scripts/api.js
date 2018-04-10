
const api = (function(){

	const API_KEY = 'AIzaSyAvFxw4hQ0lU1A53AlrPuFaegkd-RPIJcg';

	const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

	const fetchVideos = function(searchTerm, callback) {
		let data = {'maxResults': '25',
			'part': 'snippet',
			'q': searchTerm,
			'key': API_KEY,
		};
		$.getJSON(BASE_URL, data, function(response) {
			callback(decorateResponse(response));
		});
	};

	const decorateResponse = function(response) {
		return response.items.map(item => {
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
	};

	return {
		fetchVideos
	};
}());
