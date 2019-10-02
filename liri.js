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

function getSongs(songName) {
  

  
  if (songName === "") {
    songName = "I Saw the Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //Artist(s)
    console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
    // A preview link of the song from Spotify
    console.log("Preview Link: ", data.tracks.items[0].preview_url)
    // The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}

