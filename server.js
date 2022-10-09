'use strict';

// requires are like imports

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const lists = require('./data/shopping-list.json');

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

// defines endpoint that gets data and returns it to react
app.get('/data', (req, res) => {
// grabing the search query from the request object
// notice the query parameter is named "type"
// type is the name of the query paramter we must send along with axios from react in order to ask for data for our server
  const type = req.query.type;
  console.log('query parameter: ', req.query);
  console.log('type ', type);
  //   we need to have this
  const shoppingList = new List(type);
  const listItems = shoppingList.getItems();
  res.status(200).send('testing endpoint', listItems);
});

class List {
  constructor(type){
    // find method to find type of list we want to return
    let { listName, items } = lists.lists.find(list => list.listName === type);
    this.type = listName;
    this.itemValues = items;
  }

  //   a method that gets name and desc properties from itemValues array
  getItems(){
    return this.itemValues.map( item => ({
      name:item.name,
      description: item.description
    }));
  }

}

// This line of code needs to be the last line of code in file
// listen tells our app which port to listen on
// which port to serve our server on
app.listen(PORT, console.log(`listen on PORT ${PORT}`));
