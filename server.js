'use strict';

// requires are like imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


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

app.get('/weather', getWeather);


app.get('/movies', getMovies );



app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error.message);
});


// This line of code needs to be the last line of code in file
// listen tells our app which port to listen on
// which port to serve our server on
app.listen(PORT, console.log(`listen on PORT ${PORT}`));
