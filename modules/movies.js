'use strict';

const axios = require('axios');
const cacheDB = require('./cache');

const getMovies = async (request, response, next) => {
  try {
    const searchQuery = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`;

    const key = searchQuery;

    if (cacheDB[key]) {
      cacheDB[key].timestamp = Date.now();
      response.send(cacheDB);
    }
    else {

      const movies = await axios.get(url);
      console.log(movies.data);
      const moviesArray = movies.data.results.map(movie => new Movie(movie));
      cacheDB[key] = moviesArray;
      response.status(200).send(moviesArray);

    }
  } catch (error) {
    next(error);
  }
};

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

module.exports = getMovies;
