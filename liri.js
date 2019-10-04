require("dotenv").config();

// Global Variables
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");
var defaultMovie = "Mr. Nobody";


// statement for what the user chooses to do
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":

    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie , use default
    if (value == "") {
      value = defaultMovie;
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

// function to get data back on artist
function getBands(artist) {

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the venue:", response.data[0].venue.name);
      console.log("Venue location:", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      console.log("Date of the Event:", eventDate);
    })

}

// function to get data back on song
function getSongs(songName) {

  if (songName === "") {
    songName = "I Saw the Sign";
  }

  spotify.search({
    type: 'track',
    query: songName
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }



    console.log("Artists: ", data.tracks.items[0].album.artists[0].name)

    console.log("Preview Link: ", data.tracks.items[0].preview_url)

    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}

//function to get info back on movie title
function getMovies(movieName) {
  // var movieName = value;
  axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=7c351551")
    .then(function (data) {

      var results = '------------------------\n' +
        'Movie Information:\n' +
        '------------------------\n\n' +
        'Movie Title: ' + data.data.Title + '\n' +
        'Year Released: ' + data.data.Released + '\n' +
        'IMBD Rating: ' + data.data.imdbRating + '\n' +
        'Rotten Tomatoes Rating: ' + data.data.tomatoRating + '\n' +
        'Country Produced: ' + data.data.Country + '\n' +
        'Language: ' + data.data.Language + '\n' +
        'Plot: ' + data.data.Plot + '\n' +
        'Actors: ' + data.data.Actors + '\n';
      console.log(results);
    })




  //Response if user does not type in a movie title
  if (movieName === "Mr. Nobody") {
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
  };
}

// pulls info out of random.txt
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    var action = data[0]
    var value = data[1]
    // getSongs(value)
    switch (action) {
      case "concert-this":
        getBands(value)
        break;
      case "spotify-this-song":
        getSongs(value)
        break;
      case "movie-this":
        getMovies(value)
        break;
      default:
        break;
    }
  });
}