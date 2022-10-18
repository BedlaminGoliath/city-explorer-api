'use strict';

// requires are like imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weather = require('./data/weather.json');
const axios = require('axios');


//  create instance of an express server
const app = express();

// bring in middleware - tells our express app to use cors
app.use(cors());

// set our PORT var to tell express where to serve our server
// PORT must be names PORT because Heroku needs the name
const PORT = process.env.PORT || 3002;



// define the  "home"  route aka endPoint for testing purposes
app.get('/', (request, response) => {
  response.send('testing');
});
// app.get('/fakeError', (request, response) =>{
//   const doesntExist = require('./doesntexist.json');
//   response.status(200).send(doesntExist);

// });


// ===========TA help===================

// app.get('/weather', handleWeatherFunction);

// ============TA help===================


// function handleWeatherFunction ( req, res, next){
//   const searchQuery = req.query;
//   console.log(req.query.searchQuery);

// // defines endpoint that gets data and returns it to react
app.get('/weather', async (request, response, next) => {
  try {

    //     // grabing the search query from the request object
    //     // notice the query parameter is named "type"
    //     // type is the name of the query paramter we must send along with axios from react in order to ask for data for our server
    //     // const lat = req.query.lat;
    //     // const lon = req.query.lon;
    const { lat, lon, searchQuery } = request.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const foreCastArray = weatherResponse.data.data.map(day => new ForeCast(day));
    response.status(200).send(foreCastArray);
  } catch (error) {
    next(error);
  }
});

class ForeCast {
  constructor(day) {
    this.date = day.datetime,
    this.description = day.weather.description;
  }
}
app.get('/movies', async (request, response, next) => {
  try {

    const searchQuery  = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`;
    const movies = await axios.get(url);
    console.log(movies.data);
    const moviesArray = movies.data.results.map(movie => new Movie(movie));
    response.status(200).send(moviesArray);
  } catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error.message);
});


// This line of code needs to be the last line of code in file
// listen tells our app which port to listen on
// which port to serve our server on
app.listen(PORT, console.log(`listen on PORT ${PORT}`));
