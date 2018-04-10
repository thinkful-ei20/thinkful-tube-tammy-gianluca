/*global api, store */

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
		if(pageTokens[0]) {
			buttons += '<a class=\'page-button prev\'href=#>prev</a>';
		}
		if(pageTokens[1]) {
			buttons += '<a class=\'page-button next\' href=#>next</a>';
		}
		return buttons;
	};

	const handleFormSubmit = function() {
		$('form').submit(function(event){
			event.preventDefault();
			const searchTerm = $(event.currentTarget).find('#search-term');
			store.setSearchTerm = searchTerm.val();
			api.fetchVideos(store.searchTerm, function(response){
				store.setVideos(response.videos);
				store.setPageTokens(response.pageTokens);
				console.log(store.pageTokens);
				render();
			});
		});
	};

	const handlePageScroll = function() {
		$('.controls').on('click', '.page-button', function(event) {
			const text = $(event.target).text();
			api.fetchVideos()
		});
	};

	const bindEventListeners = function() {
		handleFormSubmit();
		handlePageScroll();
	};

	const render = function(){
		const items = store.videos;
		const pageTokens = store.pageTokens;
		const htmlString = generateVideoHtmlString(items);
		const buttons = generatePageButtons(pageTokens);
		console.log(buttons);
		$('.results').html(htmlString);
		$('.controls').html(buttons);
	};

	return {
		render,
		bindEventListeners,
	};
}());
