'use strict';
/*global api, store */

const videoList = (function(){
  let lightbox_trigger = false;
	
  let checkLightboxTrigger = function () {
    lightbox_trigger = !lightbox_trigger;
    if (lightbox_trigger === false) {
      $('#lightbox').hide();
    } else {
      $('#content').attr('src', `https://www.youtube.com/watch?v=${this.item.id}`);
    }

  };
  const generateVideoItemHtml = function(item) {
    console.log('generate html ran');
    return `
		<li class='searchResults' id='${item.id}'>
			<p>${item.title}</p>
			<a href='https://www.youtube.com/watch?v=${item.id}'class = 'class='lightbox_trigger'>
				<img src='${item.thumbnail}' alt='${item.title}'>
			</a>
			<a href='https://www.youtube.com/channel/${item.channelId}'>${item.channelTitle}</a>
		</li>`;

  };

  const generateVideoHtmlString = function (videos){
    const items = videos.map((item) => generateVideoItemHtml(item));
    return items.join('');
  };

  const handleFormSubmit = function() {
    $('form').submit(function(event){
      event.preventDefault();
      const searchTerm = $(event.currentTarget).find('#search-term');
      api.fetchVideos(searchTerm.val(), function(response){
        store.setVideos(response);
        render();
      });
    });
  };
	
  const handleLightBox = function () {
    $('.lightbox_trigger').click(function(event) {
      event.preventDefault();
      checkLightboxTrigger ();
    });
  };

  const bindEventListeners = function() {
    handleFormSubmit();
    handleLightBox();
  };

  const render = function(){
    const items = store.videos;
    const htmlString = generateVideoHtmlString(items);
    $('.results').html(htmlString);
  };

  return {
    render,
    bindEventListeners,
  };
}());
