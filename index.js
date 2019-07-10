const tastediveAPI = '339797-FindNewI-1R1LYYF8';
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

// put your own value below!
const apiKey = 'wFDJjXLe74QBMQpjyv3EnfsvQfKmQOmzMbRDW0Xl'; 
const searchURL = 'https://tastedive.com/api/similar';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`)
    //.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getSimilar(query, limit=10) {
  const params = {
    k: tastediveAPI,
    q: query,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().split(' ').join('+');
    console.log(encodeURIComponent(searchTerm));
    const maxResults = $('#js-max-results').val();
    getSimilar(searchTerm, maxResults);
  });
}

$(watchForm);