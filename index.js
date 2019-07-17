const tastediveAPI = '339797-FindNewI-4PDNXAAE';
const newsAPI = '3529a7c1a7d54e3587f38460b8114c9a';
const youtubeAPI = 'AIzaSyA4b9Rx0m_NZPQEbVMa31ZIzbsieueLXhE';

'use strict';

// TasteDive
const tasteBase = 'https://tastedive.com/api/similar';
const youtubeBase = 'https://www.googleapis.com/youtube/v3/search';
const newsBase = 'https://newsapi.org/v2/everything';

function formatQueryParamsNoEncode(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`)
    //.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function displayTasteDive(json) {
  $('#results-list').empty();
  $('#youtube-list').empty();
  $('#news-list').empty();
  for (let i = 0; i < json.Similar.Results.length; i++){
    $('#results-list').append(
      `<li><h3 class="name"><a href="JavaScript:void(0);">${json.Similar.Results[i].Name}</a></h3>
      <p class="taste-type">Type: ${json.Similar.Results[i].Type}</p>
      <p class="taste-description">Description: ${json.Similar.Results[i].wTeaser}</p>
      <p class="taste-wikiurl hidden">Visit the Wiki: <a href="${json.Similar.Results[i].wUrl}">${json.Similar.Results[i].wUrl}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function displayTasteDiveNotFound(json) {
  $('#results-list').empty();
  $('#youtube-list').empty();
  $('#news-list').empty();
  $('#results-list').append(
    `<h3 class="name">${json.Similar.Info[0].Name} is unknown, please try again</h3>`
  );
  $('#results').removeClass('hidden');
}
function displayTasteDiveNoResults(json) {
  $('#results-list').empty();
  $('#youtube-list').empty();
  $('#news-list').empty();
  $('#results-list').append(
    `<h3 class="name">${json.Similar.Info[0].Name} has no results, please try another search</h3>`
  );
  $('#results').removeClass('hidden');
}
function getSimilar(query, limit=10, info=1) {
  const params = {
    k: tastediveAPI,
    q: query,
    limit,
    info,
  };
  const queryString = formatQueryParamsNoEncode(params);
  const tasteURL = tasteBase + '?' + queryString + '&callback=handleRequest' ;

  console.log(tasteURL);

  const makeAjaxRequest = () => {
    window.handleRequest = x => {
      console.log(x.Similar.Info[0].Type);
      if (x.Similar.Info[0].Type === "unknown") {
        displayTasteDiveNotFound(x);
      }
      else if (x.Similar.Results.length === 0) {
        displayTasteDiveNoResults(x);
      }
      else {
        displayTasteDive(x);
      }
    }
    
    const tag = document.createElement("script");
    tag.src = tasteURL;
    document.getElementsByTagName("head")[0].appendChild(tag);
  };
  makeAjaxRequest();

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().split(' ').join('+');
    const maxResults = $('#js-max-results').val();
    getSimilar(searchTerm, maxResults);
  });
}

//YouTube
function displayYouTube(youtubeResponse) {
  console.log(youtubeResponse);
  $('#youtube-list').empty();
  for (let i = 0; i < youtubeResponse.items.length; i++){
    $('#youtube-list').append(
      `<li><a target="_blank" href='https://www.youtube.com/watch?v=${youtubeResponse.items[i].id.videoId}'><img src='${youtubeResponse.items[i].snippet.thumbnails.medium.url}'></a>
      <a target="_blank" href='https://www.youtube.com/watch?v=${youtubeResponse.items[i].id.videoId}'><h3>${youtubeResponse.items[i].snippet.title}</a></h3>
      <p>${youtubeResponse.items[i].snippet.description}</p>
      </li>`
    )};
    //<iframe src='https://www.youtube.com/watch?v=${youtubeResponse.items[i].id.videoId}' width="420" height="315"></iframe>
  //display the results section  
  $('#more-info').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults=10) {
  const params = {
    key: youtubeAPI,
    q: query,
    part: 'snippet',
    maxResults,
    type: 'video'
  };
  const youtubeQuery = formatQueryParams(params);
  const youtubeURL = youtubeBase + '?' + youtubeQuery;

  console.log(youtubeURL);

  fetch(youtubeURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(youtubeResponse => displayYouTube(youtubeResponse))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
//News API
function displayNews(newsResponse) {
  console.log(newsResponse);
  $('#news-list').empty();

  for (let i = 0; i < newsResponse.articles.length; i++){
    $('#news-list').append(
      `<li><img src='${newsResponse.articles[i].urlToImage}' />
      <h3><a href="${newsResponse.articles[i].url}" target="_blank">${newsResponse.articles[i].title}</a></h3>
      <p>${newsResponse.articles[i].author}</p>
      <p>${newsResponse.articles[i].description}</p>
      </li>`
    )};
  $('#more-info').removeClass('hidden');
};

function getNews(query, maxResults=10) {
  const params = {
    apiKey: newsAPI,
    q: query,
    sortBy: 'relevancy',
    pageSize: maxResults,
  };
  const newsQuery = formatQueryParams(params);
  const newsURL = newsBase + '?' + newsQuery;

  console.log(newsURL);

  fetch(newsURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(newsResponse => displayNews(newsResponse))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchTasteResults() {
  $('#results-list').on('click', '.name', function(event) {
    const tasteName = $(this).text();
    const maxResults = $('#js-max-results').val();
    const tasteType = $(this).parent().find('.taste-type').text();
    const tasteDesc = $(this).parent().find('.taste-description').text();
    const tasteWURL = $(this).parent().find('.taste-wikiurl').text();
    getYouTubeVideos(tasteName, maxResults);
    getNews(tasteName, maxResults);
    moreDescription(tasteType, tasteName, tasteDesc, tasteWURL);
  });
}

function moreDescription(type, name, desc, wurl) {
  $('#more-description').empty();
  $(window).scrollTop(0);
  $('#more-description').append(
    `<h2 class="moreName">${name}</h2>
    <h3 class="moreType">${type}</h3>
    <p class="moreDesc">${desc}</p>
    <p class="moreUrl"><a href="${wurl}">Learn more on Wikipedia</a></p>
    `
  );
  $('#more-description').removeClass('hidden');
}
function howToUse() {
  $('#how-to-use').on('click', function(event){
    event.preventDefault();
    $('#instructions').removeClass('hidden');
  })
}
//Close Modals
function closeModal() {
  $('.close-modal').on('click', function(event) {
    event.preventDefault();
    $('#instructions').addClass('hidden');
    $('#more-info').addClass('hidden');
  })
}

//Functions to run
function runStart() {
  watchForm();
  watchTasteResults();
  closeModal();
  howToUse();
}
$(runStart);


