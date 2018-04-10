const store = (function(){

	const videos = [];
	const pageTokens = [];
	const query = {};

	const setVideos = function(videos) {
		this.videos = videos;
	};
	const setPageTokens = function(pageTokens) {
		this.pageTokens = pageTokens;
	};
	const setSearchTerm = function(searchTerm) {
		this.query.q = searchTerm;
	};

	return {
		videos,
		pageTokens,
		setVideos,
		setPageTokens,
		setSearchTerm,
	};
}());
