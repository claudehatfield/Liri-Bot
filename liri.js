require("dotenv").config();

// Global Variables
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var defaultMovie = "Mr. Nobody";


// statement for what the user chooses to do
switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":

    getSongs(value)
    break;
  case "movie-this":

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



var action = process.argv[2];
var value = process.argv[3];

// axios.get for artist events comming up.
function getBands(artist) {

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the venue:", response.data[0].venue.name);
      console.log("Venue location:", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      console.log("Date of the Event:", eventDate);
    })

}

/// getting song infomation
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

    //Artist(s)
    console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
    // A preview link of the song from Spotify
    console.log("Preview Link: ", data.tracks.items[0].preview_url)
    // The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}

// getting movie infomation
function getMovies(movieName) {
  axios.get("http://www.omdbapi.com/?apikey=7c351551=" + movieName)
    .then(function (data) {
      var results = `
      Title of the movie: ${data.data.Title}
      Year the movie came out: ${data.data.Year}
      IMDB Rating of the movie: ${data.data.Rated}
      Rotten Tomatoes Rating of the movie: ${data.data.Ratings[1].Value}
      Country where the movie was produced: ${data.data.Country}
      Language of the movie: ${data.data.Language}
      Plot of the movie: ${data.data.Plot}
      Actors in the movie: ${data.data.Actors}`;
      console.log(results)
    })


  if (movieName === "Mr. Nobody") {
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  };
}

/// gets data from the txt file and does what it says
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    var action = data[0]
    var value = data[1]
    
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