/** Parameters for TMDB API calls
 * API Calls are not rate limited
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '88254a5d0bfad1989e48e9d3b2ed3f7f';
const TMDB_IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const MOVIE_PLACEHOLDER_IMG =
  'https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_960_720.jpg';

/**
 * Capture html elements to alter contents on screen
 */
const form = document.getElementById('search-form');
const movieContainer = document.querySelector('#movie-container');

/**
 * Function accepts 2 parameters.
 * Query is collected from user input
 * Match api_key to expected parameter from API for ease of use
 *
 * Display error badge if no results are returned
 *
 */

async function getMovie(query, api_key) {
  try {
    let res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { query, api_key },
    });

    const movies = res.data.results;
    if (movies.length) {
      for (let movie of movies) {
        movieEle(movie);
      }
    } else {
      movieContainer.innerHTML += `<div class="alert alert-danger" role="alert">
      Sorry, no result found
    </div>`;
    }
  } catch (error) {
    console.log(error.response);
    movieContainer.innerHTML += `<div class="alert alert-danger" role="alert">
        API Error
    </div>`;
  }
}

/**
 *
 * Collect input from user and pass to getMovie
 * Clear container on every search
 *
 */

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('search-query');

  if (input.value !== '' || input.value) {
    movieContainer.innerHTML = '';
    getMovie(input.value, TMDB_API_KEY);
  }
});

/**
 * Create bootstrap card for a movie
 * Displays image, title and overview with responsive design
 *
 */

function movieEle(movie) {
  const movieImg = movie.backdrop_path
    ? `${TMDB_IMG_BASE_URL}${movie.backdrop_path}`
    : MOVIE_PLACEHOLDER_IMG;

  movieContainer.innerHTML += `<div class="card col-sm-auto" style="width: 18rem;">
        <img class="card-img-top" src="${movieImg}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.overview}</p>
        </div>
      </div>`;
}
