'use strict';

// requires are like imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
// axios = require('axios'); when not working out of a json file

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
app.get('/weather', handleWeatherFunction);
// function handleWeatherFunction ( req, res, next){
//   const searchQuery = req.query;
//   console.log(req.query.searchQuery);

// // defines endpoint that gets data and returns it to react
// // app.get('/weather', (req, res, next) => {
//   try {

//     // grabing the search query from the request object
//     // notice the query parameter is named "type"
//     // type is the name of the query paramter we must send along with axios from react in order to ask for data for our server
//     // const lat = req.query.lat;
//     // const lon = req.query.lon;
//     // const { lat, lon, searchQuery } = request.query;
//     console.log('query parameter: ', req.query);
//     console.log(searchQuery);
//     //   we need to have this
//     const foreCastData = new ForeCast(searchQuery);
//     const foreCastArray = foreCastData.getForeCast();
//     res.status(200).send(foreCastArray);
//   } catch (error) {
//     next(error);
//   }
// }


// class ForeCast {
//   constructor(searchQuery){
//     // find method to find type of list we want to return
//     console.log(weather);
//     console.log(data);
//     let data  = weather.find( city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
//     this.data = data;
//     console.log(searchQuery);

//   }

function handleWeatherFunction(req, res, next){
  let { searchQuery } = req.query;
  let city = weather.find(city => city.city_name === searchQuery);
  try{
    const weatherArr = city.data.map( day => new ForeCast(day));
    res.status(200).send(weatherArr);

  } catch (err) {
    next(err);
  }
}

function ForeCast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}
//   a method that gets name and desc properties from itemValues array
//   getForeCast(){
//     return this.data.map( day => ({
//       date: day.valid_date,
//       description: day.weather.description
//     }));
//   }

// }

app.use((error, request, response, next ) => {
  console.log(error);
  response.status(500).send(error.message);
});


// This line of code needs to be the last line of code in file
// listen tells our app which port to listen on
// which port to serve our server on
app.listen(PORT, console.log(`listen on PORT ${PORT}`));