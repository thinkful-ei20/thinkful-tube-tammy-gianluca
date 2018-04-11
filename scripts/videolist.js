/* global api, store */

const videoList = (function(){

	const generateVideoItemHtml = function(item) {
		console.log('generate html ran');
		return `
		<li class='searchResults' id='${item.id}'>
			<p>${item.title}</p>
			<a href='https://www.youtube.com/watch?v=${item.id}'>
				<img src='${item.thumbnail}' alt='${item.title}'>
			</a>
			<a href='https://www.youtube.com/channel/${item.channelId}'>${item.channelTitle}</a>
		</li>`;
	};

	const generateVideoHtmlString = function (videos){
		const items = videos.map((item) => generateVideoItemHtml(item));
		return items.join('');
	};

	const generatePageButtons = function(pageTokens){
		let buttons = '';
		if(pageTokens.prev) {
			buttons += '<a class=\'page-button prev\'href=#>prev</a>';
		}
		if(pageTokens.next) {
			buttons += '<a class=\'page-button next\' href=#>next</a>';
		}
		return buttons;
	};

	const apiHandler = function(query) {
		api.fetchVideos(query, function(response){
			store.setVideos(response.videos);
			store.setPageTokens(response.pagetokens);
			render();
		});
	};

	const handleFormSubmit = function() {
		$('form').submit(function(event){
			event.preventDefault();
			const query = {};
			const searchTerm = $(event.currentTarget).find('#search-term');
			query.q = searchTerm.val();
			apiHandler(query);
		});
	};

	const handlePageScroll = function() {
		$('.controls').on('click', '.page-button', function(event) {
			const query = {};
			const pagetoken = $(event.target).text();
			query.pageToken = pagetoken;
			apiHandler(query);
		});
	};

	const bindEventListeners = function() {
		handleFormSubmit();
		handlePageScroll();
	};

	const render = function(){
		const items = store.videos;
		const pagetokens = store.pagetokens;
		const htmlString = generateVideoHtmlString(items);
		const buttons = generatePageButtons(pagetokens);
		$('.results').html(htmlString);
		$('.controls').html(buttons);
	};

	return {
		render,
		bindEventListeners,
	};
}());
