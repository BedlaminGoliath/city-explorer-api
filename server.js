'use strict';

// requires are like imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./data/weather.json');
const request  = require('express');


//  create instance of an express server
const app = express();

// bring in middleware - tells our express app to use cors
app.use(cors());

// set our PORT var to tell express where to serve our server
// PORT must be names PORT because Heroku needs the name
const PORT = process.env.PORT || 3002;


// define the  "home"  route aka endPoint

app.get('/', (request, response) => {
  response.send('testing');
});
// app.get('/fakeError', (request, response) =>{
//   const doesntExist = require('./doesntexist.json');
//   response.status(200).send(doesntExist);

// });

// defines endpoint that gets data and returns it to react
app.get('/weather', (req, res, next) => {
  try {

    // grabing the search query from the request object
    // notice the query parameter is named "type"
    // type is the name of the query paramter we must send along with axios from react in order to ask for data for our server
    const lat = req.query.lat;
    const lon = req.query.lon;
    const searchQuery = req.query.searchQuery;
    // const { lat, lon, searchQuery } = request.query;
    console.log('query parameter: ', req.query);
    console.log(searchQuery);
    //   we need to have this
    const foreCastData = new ForeCast(searchQuery);
    const foreCastArray = foreCastData.getForeCast();
    res.status(200).send(foreCastArray);
  } catch (error) {
    next(error);
  }

});

class ForeCast {
  constructor(searchQuery){
    // find method to find type of list we want to return
    let { data } = weather.find( city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    this.data = data;

  }

  //   a method that gets name and desc properties from itemValues array
  getForeCast(){
    return this.data.map( day => ({
      date: day.datetime,
      description: day.weather.description
    }));
  }

}

app.use((error, request, response, next ) => {
  console.log(error);
  response.status(500).send(error.message);
});


// This line of code needs to be the last line of code in file
// listen tells our app which port to listen on
// which port to serve our server on
app.listen(PORT, console.log(`listen on PORT ${PORT}`));
