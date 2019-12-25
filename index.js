'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson, userName){
  console.log(responseJson);
    $('#results-list').empty();
    $('#results-list').append(`
    <tr>
    <td><b>Project</b></th>
    <td><b>URL</b></th>
    </tr>`);
    // if there are previous results, remove them
    for (let i = 0; i < responseJson.length; i++){
        $('#results-list').append(`
        <tr>
        <td>${responseJson[i].full_name.replace(`${userName + '/'}`, '')}</td>
        <td><a href="${responseJson[i].html_url}">${responseJson[i].html_url}<a/></td>
        </tr>
        `);
    }

    $('#results').removeClass('hidden');
}

function getNews(query){
    const url = searchURL + query + '/repos';
    fetch(url)
      .then(response => {return response.json();})
      .then(responseJson => displayResults(responseJson, query))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      getNews(searchTerm);
    });
}

$(watchForm);