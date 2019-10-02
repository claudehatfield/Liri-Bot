require("dotenv").config();
var Spotify = require('node-spotify-api');
var  axios = require('axios');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var defaultMovie = "Mr. Nobody";





var action = process.argv[2];
var value = process.argv[3];

getBands();
function getBands(artist) {
  // var artist = value;
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the venue:", response.data[0].venue.name);
      console.log("Venue location:", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      console.log("Date of the Event:", eventDate);
    })
}

