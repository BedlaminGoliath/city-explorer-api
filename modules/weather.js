'use strict';

const axios = require('axios');
const cache = require('./cache.js');

// const getWeather = async (request, response, next) => {

//   try {
//     const { lat, lon }  = request.query;
//     const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
//     const weatherResponse = await axios.get(url);
//     console.log(weatherResponse.data);
//     const foreCastArray = weatherResponse.data.data.map(day => new ForeCast(day));
//     response.status(200).send(foreCastArray);
//   } catch (error) {
//     next(error);
//   }
// };


function getWeather(lat, lon) {

  const key = 'weather ' + lat + lon;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
  
  if(cache[key] && (Date.now() - cache[key].timestamp < 100000)){
    console.log('cache hit')
  } else {
    console.log('cache miss');



  }
  try {
    const { lat, lon }  = request.query;
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const foreCastArray = weatherResponse.data.data.map(day => new ForeCast(day));
    response.status(200).send(foreCastArray);
  } catch (error) {
    next(error);
  }
};



// const getWeather = async (request, response) => {

//   let { lat, lon } = request.query;
//   lat, lon = search;

//   if (cache[search] !== undefined) {
//     console.log('info from cache: ', search);
//     response.status(200).send(cache[search]);
//   } else {
//     const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
//     axios
//       .get(url)
//       // console.log(weatherResponse.data);
//       .then(weatherResponse => {
//         const foreCastArray = weatherResponse.data.data.map(day => new ForeCast(day));

//         cache[search] = foreCastArray;
//         response.status(200).send(foreCastArray);
//       }).catch(error => {
//         response.status(500).send(error);
//       });
//   }
// };




class ForeCast {
  constructor(day) {
    this.date = day.datetime,
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
