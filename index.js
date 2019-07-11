const tastediveAPI = '339797-FindNewI-4PDNXAAE';
const newsAPI = '3529a7c1a7d54e3587f38460b8114c9a';
const youtubeAPI = 'AIzaSyA4b9Rx0m_NZPQEbVMa31ZIzbsieueLXhE';

/*  Getting text string to query form    
function test() {
  $('.test').click(function(){
    event.preventDefault();
    let test = $(this).text();
    var replaced = test.split(' ').join('+');
    console.log(replaced);
  })
}
*/

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
      `<li><h3 class="name">${json.Similar.Results[i].Name}</h3>
      <p>Type: ${json.Similar.Results[i].Type}</p>
      <p>Description: ${json.Similar.Results[i].wTeaser}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

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
    window.handleRequest = x => displayTasteDive(x);
    const tag = document.createElement("script");
    tag.src = tasteURL;
    document.getElementsByTagName("head")[0].appendChild(tag);
  };
  makeAjaxRequest();

  /*fetch(url, {headers:myHeaders})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/
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
  // if there are previous results, remove them
  console.log(youtubeResponse);
  $('#youtube-list').empty();
  // iterate through the items array
  for (let i = 0; i < youtubeResponse.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#youtube-list').append(
      `<li><h3>${youtubeResponse.items[i].snippet.title}</h3>
      <p>${youtubeResponse.items[i].snippet.description}</p>
      <img src='${youtubeResponse.items[i].snippet.thumbnails.default.url}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
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

function watchTasteResults() {
  $('#results-list').on('click', '.name', function(event) {
    const tasteName = $(this).text();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(tasteName, maxResults);
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
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query, maxResults=10) {
  const params = {
    apiKey: newsAPI,
    q: query,
    length: maxResults,
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
    getYouTubeVideos(tasteName, maxResults);
    getNews(tasteName, maxResults)
  });
}
$(watchForm);
$(watchTasteResults);

