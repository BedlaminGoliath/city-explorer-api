'use strict';

// requires are like imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ======class 11========
// const mongoose = require('mongoose');
// ====================

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


//  create instance of an express server
const app = express();

// bring in middleware - tells our express app to use cors
app.use(cors());

// set our PORT var to tell express where to serve our server
// PORT must be names PORT because Heroku needs the name
const PORT = process.env.PORT || 3002;

// =============class 11
// connecting to our database called can of books using mongoose
// mongoose.connect('monodb://localhost')

// actual connection takes place
// cost db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:;));
// 
// ===========================


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

app.listen(PORT , ()=> console.log('listening on Port'));


// create a schema lab 11 ======
// 'use strict';

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const catSchema = new Schema({
//   name:String,
//   color: String,
//   hasClaws: Boolean,
//   location: String
// });

// create a model, name it which will turn into the name of the collection in mongoDB (plus an 's' on the end)
// pass it the shape of the data, which will always be your schema that you just defined

// const Cat = mongoose.modal('Cat', catSchema);

// ====lab 11 =========
