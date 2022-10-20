'use strict';

const axios = require('axios');

const getWeather = async (request, response, next) => {
  try {
    const { lat, lon }  = request.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const foreCastArray = weatherResponse.data.data.map(day => new ForeCast(day));
    response.status(200).send(foreCastArray);
  } catch (error) {
    next(error);
  }
};

class ForeCast {
  constructor(day) {
    this.date = day.datetime,
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
