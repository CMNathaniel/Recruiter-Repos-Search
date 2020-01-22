'use strict';

const searchURL = "https://api.github.com/users/";

function displayResults(responseJson) {
$('#results-list').empty();
console.log(responseJson);
responseJson.forEach((repo) => {
 $('#results-list').append(
    `<li>
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description}</p>
    </li>`
   )
  });
 $('#results').removeClass('hidden');

}

function getRepos(searchTerm) {
  const url = searchURL + searchTerm + '/repos';
  console.log(url);

  fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}
  
$(watchForm);
