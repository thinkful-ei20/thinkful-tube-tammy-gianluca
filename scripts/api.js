
const api = (function(){

	const API_KEY = 'AIzaSyAvFxw4hQ0lU1A53AlrPuFaegkd-RPIJcg';

	const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

	const fetchVideos = function(searchTerm, callback) {
		let data = {'maxResults': '25',
			'part': 'snippet',
			'q': searchTerm,
			'key': API_KEY,
		};
		$.getJSON(BASE_URL, data, callback);
	};

	return {
		fetchVideos
	};
}());