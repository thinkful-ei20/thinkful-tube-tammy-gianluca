const store = (function(){

	const videos = [];
	const pagetokens = {};

	const setVideos = function(videos) {
		this.videos = videos;
	};
	const setPageTokens = function(pagetokens) {
		this.pagetokens = pagetokens;
	};

	return {
		videos,
		pagetokens,
		setVideos,
		setPageTokens,
	};
}());
